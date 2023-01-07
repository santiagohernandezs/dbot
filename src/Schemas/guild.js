const { Schema, model } = require('mongoose')

const GuildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  guildIcon: { type: String, required: false }
})

module.exports = model('Guild', GuildSchema, 'guilds')
