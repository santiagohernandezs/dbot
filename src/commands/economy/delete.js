const { SlashCommandBuilder } = require('discord.js')
const Gift = require('../../Schemas/gift')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete a user from the database')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the gift to delete')
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name')

    const giftName = await Gift.findOne({ name: name })
    if (giftName) {
      await Gift.deleteOne({ name: name })
      await interaction.reply({ content: 'Gift Deleted Successfully' })
    } else {
      interaction.reply({ content: `No gift founded with the name ${name}` })
    }
  }
}
