import Message from './schema/Message'
import Standuply from './bot/standuply'
import cronJob from './lib/cronJob'


const route = (server) => {

  server.get('/standuply', (req, res) => {
    Standuply()    
    res.send('Hello from Opal')
  })

  server.post('/update-cronjob-1', (req, res) => {
    const { teamId, min, hour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-frist`
    cronJob(cronJobKey, min, hour, dayOfWeek)
    res.end()
  })

  server.post('/update-cronjob-2', (req, res) => {
    const { teamId, min, hour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-remind`
    cronJob(cronJobKey, min, hour, dayOfWeek)
    res.end()
  })

  server.post('/update-cronjob-3', (req, res) => {
    const { teamId, min, hour, dayOfWeek } = req.body
    const cronJobKey = `${teamId}-close`
    cronJob(cronJobKey, min, hour, dayOfWeek)
    res.end()
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