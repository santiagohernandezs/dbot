module.exports = {
  data: {
    name: 'tool' // The id of the modal
  },
  async execute(interaction, client) {
    const { fields } = interaction

    interaction.reply({
      content: `The user that you are looking for is: ${fields.getTextInputValue(
        'username'
      )}`
    })
  }
}
