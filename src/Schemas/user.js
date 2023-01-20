const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userName: { type: String, required: true },
  userTag: { type: String, required: true }
})

module.exports = model('User', UserSchema, 'users')
