const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('embed').setDescription('Sends an embed'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Embed Title')
      .setDescription('Embed Description')
      .setColor('#FF0000')
      .setFooter({
        text: 'Embed Footer',
        iconURL: 'https://i.imgur.com/wSTFkRM.png'
      })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  }
}
