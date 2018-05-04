import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cronJob from 'cron'

import route from './route'
import standuply from './bot/standuply'

const server = express()

const CronJob = cronJob.CronJob

const NODE_PORT = 4000
const MONGO_CONNECTION = 'mongodb://borbork:borbork@bar-bork-thinknet-shard-00-00-797rd.mongodb.net:27017,bar-bork-thinknet-shard-00-01-797rd.mongodb.net:27017,bar-bork-thinknet-shard-00-02-797rd.mongodb.net:27017/daily-report?ssl=true&replicaSet=bar-bork-thinknet-shard-0&authSource=admin'

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true,
}))

// new CronJob('0 */1 * * * *', () => {
//   standuply()
// }, null, true, 'Asia/Bangkok')

// new CronJob('0 */1 * * * *', () => {
//   console.log('cronJob 2 start')
// }, null, true, 'Asia/Bangkok')

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
