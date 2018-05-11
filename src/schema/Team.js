import mongoose from 'mongoose'

const SchemaModel = mongoose.Schema
const teamSchema = new SchemaModel({
  team: { type: String, required: true, index: true },
  question: { type: Array, default: [] },
  member: { type: Array, default: [] },
  cronjob: { type: Object, default: {} },
  answer: { type: Array, default: []},
  created_at: { type: Date, default: Date.now }
})
const Team = mongoose.model('Team', teamSchema)

export default Team
