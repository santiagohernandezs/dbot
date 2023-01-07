const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: {
    name: 'tool' // The id of the modal
  },
  async execute(interaction, client) {
    const { fields } = interaction

    const embed = new EmbedBuilder().setTitle('User Tool').addFields({
      name: 'Username',
      value: fields.getTextInputValue('username')
    })

    interaction.reply({
      embeds: [embed]
    })
  }
}
