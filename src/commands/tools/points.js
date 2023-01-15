const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('points')
    .setDescription('Displays an embed with an anaucement')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to give points to')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('points')
        .setDescription('The amount of points to give')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user')
    const points = interaction.options.getInteger('points')
    const embed = new EmbedBuilder()
      .setTitle(`${user.tag} ha ganado ${points} puntos`)
      .setDescription(
        `Felecidades, has ganado ${points} puntos, recuerda que puedes canjearlos por premios en la tienda.`
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor('#FF0000')
      .addFields([
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Acceder a la tienda',
          value: '/shop',
          inline: true
        },
        {
          name: 'Acceder a la tabla de posiciones',
          value: '/leaderboard',
          inline: true
        }
      ])
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL()}`
      })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  }
}
