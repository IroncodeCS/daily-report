import Message from './schema/Message'
import Standuply from './bot/standuply';

const question = (server) => {

  server.get('/get_question', (req, res) => {
    res.send('successful')
  })
}

export default question