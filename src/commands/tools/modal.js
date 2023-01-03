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
    const modal = new ModalBuilder().setCustomId('modal').setTitle('Modal Title')

    const row = new TextInputBuilder()
      .setLabel('Text Input')
      .setCustomId('text_input')
      .setPlaceholder('Placeholder')
      .setStyle(TextInputStyle.Short)

    const row2 = new TextInputBuilder()
      .setLabel('Text Input 2')
      .setCustomId('text_input2')
      .setPlaceholder('Placeholder 2')
      .setStyle(TextInputStyle.Paragraph)

    const firstRow = new ActionRowBuilder().addComponents(row)
    const secondRow = new ActionRowBuilder().addComponents(row2)

    modal.addComponents(firstRow, secondRow)

    await interaction.showModal(modal)
  }
}
