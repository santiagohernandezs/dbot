const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('use')
    .setDescription('Return the user that invoked the command'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('User Info')
      .setDescription('This is the user that invoked the command')
      .setColor('#FF0000')
      .setFields([
        {
          name: 'Username',
          value: interaction.member.user.username,
          inline: true
        },
        {
          name: 'Username',
          value: interaction.member.user.tag,
          inline: true
        }
      ])

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    })
  }
}
