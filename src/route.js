import Message from './schema/Message'
import Standuply from './bot/standuply';

const route = (server) => {
  server.get('/', (req, res) => {
    res.send('Hello from Opal')
  })
  Standuply()
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