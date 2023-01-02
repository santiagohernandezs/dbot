const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('button').setDescription('Reuturns a button!'),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId('sub-yt')
      .setEmoji('👍')
      .setLabel('Subscribete al canal de YouTube')
      .setStyle(ButtonStyle.Primary)

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)]
    })
  }
}
