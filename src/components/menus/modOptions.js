module.exports = {
  data: {
    name: 'modOptions'
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You selected ${interaction.values[0]}`
    })
  }
}
