import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cronJob from 'cron'

import route from './route'

const server = express()

const CronJob = cronJob.CronJob

const { NODE_PORT, MONGO_CONNECTION } = process.env

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true,
}))


new CronJob('0 */1 * * * *', () => {
  console.log('cron job')
}, null, true, 'Africa/Lagos')

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
