const { SlashCommandBuilder } = require('discord.js')
const User = require('../../Schemas/user')
const { mongoose } = require('mongoose')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds a user to the database'),
  async execute(interaction, client) {
    let userProfile = await User.findOne({ userID: interaction.user.id })
    if (!userProfile) {
      userProfile = new User({
        _id: mongoose.Types.ObjectId(),
        userID: interaction.user.id,
        userName: interaction.user.username,
        userTag: interaction.user.tag
      })

      await userProfile.save().catch(err => console.log(err))

      await interaction.reply({
        content: `User ID: ${userProfile.userID}`
      })
      console.log(userProfile)
    } else {
      await interaction.reply({
        content: `User ID: ${userProfile.userID}`
      })
    }
  }
}
