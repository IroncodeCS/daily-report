import Team from './schema/Team'
import getTeams from './lib/getTeam'
import getUser from './lib/getUser'
import Standuply from './bot/standuply';
import getNotiByTeam from './lib/getNotiByTeam'
// import Standuply from './bot/standuply';
import Message from './schema/Message'
import calculateTimeCronjob from './lib/calculateTimeCronJob'
import cronJob from './lib/cronJob'

import updateCronJobDbClose from './lib/updateCronJobDbClose';
import updateCronJobDbFirst from './lib/updateCronJobDbFirst';
import updateCronJobDbRemind from './lib/updateCronJobDbRemind';


const route = (server) => {

  server.get('/standuply', (req, res) => {
    Standuply()    
    res.send('Hello from Opal')
  })

  server.get('/get-noti-by-team/:team_id', async (req, res) => {
    const notiData = await getNotiByTeam(req.params.team_id)
    res.json(notiData)
  })

  server.get('/get-team', async (req, res) => {
    const teams = await getTeams()
    res.json(teams)
  })

  server.get('/get-user', async (req, res) => {
    const { team_id } = req.params
    const users = await getUser(team_id)
    res.json(users)
  })

  server.get('/get-user-team/:team_id', async (req, res) => {
    const { team_id } = req.params
    const team = await Team.findById(team_id).exec()
    res.json(team)
  })

  server.post('/add-team', (req, res) => {
    new Team({
      team: req.body.team,
      member: []
    }).save()
    res.send('Add')
  })

  server.post('/remove-team', (req, res) => {
    Team.findByIdAndRemove(req.body.teamId, (err, res) => { })
    res.send('Remove')
  })

  server.post('/edit-team', async (req, res) => {
    await Team.update({ _id: req.body.teamId }, { team: req.body.team })
    res.send('OK')
  })

  server.post('/update-cronjob-1', (req, res) => {
    const { teamId, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-first`
    const result = cronJob(teamId, cronJobKey, firstMin, firstHour, dayOfWeek)
    const schedule = `0 ${firstMin} ${firstHour} * * ${dayOfWeek}`
    updateCronJobDbFirst(teamId, cronJobKey, schedule)
    result === 'success' ? res.status(200).end() : res.status(422).end()
  })

  server.post('/update-cronjob-2', (req, res) => {
    const { teamId, min, hour, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-remind`
    const time = calculateTimeCronjob(min, hour, firstMin, firstHour)
    const schedule = `0 ${time.min} ${time.hour} * * ${dayOfWeek}`
    updateCronJobDbRemind(teamId, cronJobKey, schedule)
    const result = cronJob(teamId, cronJobKey, time.min, time.hour, dayOfWeek)
    result === 'success' ? res.status(200).end() : res.status(422).end()
  })

  server.post('/update-cronjob-3', (req, res) => {
    const { teamId, hour, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-close`
    const time = calculateTimeCronjob('0', hour, firstMin, firstHour)
    const schedule = `0 ${time.min} ${time.hour} * * ${dayOfWeek}`
    updateCronJobDbClose(teamId, cronJobKey, schedule)
    const result = cronJob(teamId, cronJobKey, time.min, time.hour, dayOfWeek)
    result === 'success' ? res.status(200).end() : res.status(422).end()
  })

  server.get('/save-message', (req, res) => {

    // const doc = new Message({
    //   user: 'ok',
    //   message: [{ question: 'question', answer: 'answer' }],
    // })
    // doc.save()
    res.send('successful')
  })
}

export default route