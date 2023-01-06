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
    const modal = new ModalBuilder().setCustomId('tool').setTitle('User Tool') // the Modal

    const userRow = new TextInputBuilder() // The text input
      .setLabel('User')
      .setCustomId('username')
      .setPlaceholder('Wumpus#0001')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)

    const reasonRow = new TextInputBuilder() // The text input
      .setLabel('Reason')
      .setCustomId('reason')
      .setPlaceholder('Spamming')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)

    const detailsRow = new TextInputBuilder() // The text input
      .setLabel('Details')
      .setCustomId('details')
      .setPlaceholder('He spammed the chat with the word "Wumpus"')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false)

    const firstRow = new ActionRowBuilder().addComponents(userRow) // The row that contains the text input
    const secondRow = new ActionRowBuilder().addComponents(reasonRow) // The row that contains the text input
    const thirdRow = new ActionRowBuilder().addComponents(detailsRow) // The row that contains the text input

    modal.addComponents(firstRow, secondRow, thirdRow) // Add the row to the modal

    await interaction.showModal(modal) // Send the modal
  }
}
