const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('button').setDescription('Returns a button'),
  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Click me')
        .setCustomId('1')
        .setStyle(ButtonStyle.Primary)
    )

    await interaction.reply({
      ephemeral: true,
      components: [row]
    })
  }
}
