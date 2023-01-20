const { Schema, model } = require('mongoose')

const giftSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = model('Gift', giftSchema, 'gifts')
