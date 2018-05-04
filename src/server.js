import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import route from './route'

const server = express()

const { NODE_PORT, MONGO_CONNECTION } = process.env

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true,
}))

mongoose.Promise = global.Promise
mongoose.connect(MONGO_CONNECTION)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`DB Connected on Atlas`)
})

route(server)
server.listen(NODE_PORT, () => console.log(`running server now! ${NODE_PORT}`))

export default server
