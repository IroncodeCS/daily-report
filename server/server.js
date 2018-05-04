import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import route from './route'

const server = express()

const svPort = process.env.NODE_PORT

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true,
}))

route(server)
server.listen(svPort,() => console.log(`running server now! ${svPort}`))

export default server
