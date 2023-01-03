const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('show info about an object')
    .setDescriptionLocalizations({
      'es-ES': 'muestra información sobre un objeto'
    })
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Return the user info')
        .setDescriptionLocalizations({
          'es-ES': 'muestra información acerca de un usuario'
        })
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user to show info about')
            .setRequired(true)
        )
        .addChannelOption(option =>
          option.setName('channel').setDescription('The channel to show info about')
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('server').setDescription('Return the server info')
    ),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()

    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('user')
      const channel = interaction.options.getChannel('channel')

      const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s Info`)
        .setDescription('This is the user that invoked the command')
        .setColor('#FF0000')
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFields([
          {
            name: 'Username',
            value: user.username,
            inline: true
          },
          {
            name: 'Tag',
            value: user.tag,
            inline: true
          }
        ])

      if (channel === null) {
        interaction.reply({ embeds: [embed], ephemeral: false })
      } else {
        await interaction.deferReply()
        await channel.send({
          embeds: [embed],
          ephemeral: false
        })
        interaction.editReply({ content: 'Message sent', ephemeral: true })
      }
    }
  }
}
