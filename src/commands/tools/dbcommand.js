const { SlashCommandBuilder } = require('discord.js')
const Guild = require('../../Schemas/guild')
const { mongoose } = require('mongoose')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('db')
    .setDescription('Returns info from the database'),
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({ guildID: interaction.guild.id })
    if (!guildProfile) {
      guildProfile = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : 'none'
      })

      await guildProfile.save().catch(err => console.log(err))

      await interaction.reply({
        content: `Guild ID: ${guildProfile.guildID}`
      })
      console.log(guildProfile)
    } else {
      await interaction.reply({
        content: `Guild ID: ${guildProfile.guildID}`
      })
    }
  }
}
