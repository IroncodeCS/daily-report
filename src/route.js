import getTeams from './lib/getTeam'
import getUser from './lib/getUser'
// import Standuply from './bot/standuply';
import Message from './schema/Message'
import calculateTimeCronjob from './lib/calculateTimeCronJob'
import cronJob from './lib/cronJob'


const route = (server) => {

  server.get('/standuply', (req, res) => {
    // Standuply()    
    res.send('Hello from Opal')
  })

  server.get('/get-team', async (req, res) => {
    const teams = await getTeams()
    res.json(teams)
  })

  server.get('/get-user', async (req, res) => {
    const users = await getUser()
    res.json(users)
  })

  server.post('/update-cronjob-1', (req, res) => {
    const { teamId, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-first`
    const result = cronJob(teamId, cronJobKey, firstMin, firstHour, dayOfWeek)
    result === 'success' ? res.status(200).end() : res.status(422).end()
  })

  server.post('/update-cronjob-2', (req, res) => {
    const { teamId, min, hour, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-remind`
    const time = calculateTimeCronjob(min, hour, firstMin, firstHour)
    const result = cronJob(teamId, cronJobKey, time.min, time.hour, dayOfWeek)
    result === 'success' ? res.status(200).end() : res.status(422).end()
  })

  server.post('/update-cronjob-3', (req, res) => {
    const { teamId, hour, firstMin, firstHour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-close`
    const time = calculateTimeCronjob('0', hour, firstMin, firstHour)
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