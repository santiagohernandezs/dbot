const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('modal').setDescription('Sends a modal'),
  async execute(interaction, client) {
    const modal = new ModalBuilder().setCustomId('user').setTitle('Modal Title')

    const row = new TextInputBuilder()
      .setLabel('Text Input')
      .setCustomId('text_input')
      .setPlaceholder('Placeholder')
      .setStyle(TextInputStyle.Short)

    const firstRow = new ActionRowBuilder().addComponents(row)


    modal.addComponents(firstRow, secondRow)

    await interaction.showModal(modal)
  }
}
