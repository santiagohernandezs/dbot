module.exports = {
  data: {
    name: 'user'
  },
  async execute(interaction, client) {
    interaction.reply({
      content: `The user that you are looking for is: ${interaction.fields.getTextInputValue(
        'user'
      )}`
    })
  }
}
