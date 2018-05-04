import mongoose from 'mongoose'

const SchemaModel = mongoose.Schema
const MessageSchema = new SchemaModel({
  user: { type: String, required: true, index: true },
  message: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
  }],
  created_at: { type: Date, default: Date.now }
})
const Message = mongoose.model('Message', MessageSchema)

export default Message
