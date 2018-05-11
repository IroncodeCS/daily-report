import mongoose from 'mongoose'

const SchemaModel = mongoose.Schema
const UserSchema = new SchemaModel({
  userId: { type: String, required: true, index: true },
  user: { type: String, required: true},
  team: { type: Array, required: true },
  created_at: { type: Date, default: Date.now }
})
const User = mongoose.model('User', UserSchema)

export default User
