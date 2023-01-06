module.exports = {
  data: {
    name: '1'
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: 'You clicked the button!',
      ephemeral: true
    })
  }
}
