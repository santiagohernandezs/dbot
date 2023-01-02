module.exports = {
  data: {
    name: 'sub-yt'
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: 'https://www.youtube.com/channel/UCZ9qFECXgT8YjY8D5xPbT9w'
    })
  }
}
