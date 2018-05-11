import getTeams from './lib/getTeam'
import getUser from './lib/getUser'
// import Standuply from './bot/standuply';

const route = (server) => {
  server.get('/', (req, res) => {
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

  // Standuply()
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