const { SlashCommandBuilder } = require('discord.js')
const Gift = require('../../Schemas/gift')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all the gift that you have in the store (BETA)'),
  async execute(interaction) {
    const gifts = await Gift.find({})

    interaction.reply(`${gifts}`)
  }
}
