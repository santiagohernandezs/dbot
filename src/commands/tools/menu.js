const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Returns a Select Menu!'),
  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('modOptions')
        .setPlaceholder('Nothing selected')
        .addOptions({
          label: 'Select me',
          description: 'This is a description',
          value: 'first_option'
        })
    )

    await interaction.reply({
      components: [row]
    }) // This is required to send the menu
  }
}
