const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Time out a user')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to time out').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for timing out the user')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('time')
        .setDescription('The amount of minutes to time out the user for')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason')
    const time = interaction.options.getInteger('time')

    if (!reason) reason = 'No reason provided'

    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(err => console.log(err))

    await user
      .send({
        content: `You have been banned from ${interaction.guild.name} for ${reason}`
      })
      .catch(console.log(`Could not DM ${user.username}`))

    await member
      .timeout(time * 60 * 1000, reason)
      .then(
        await interaction.deferReply(),
        await interaction.editReply({
          content: `Timedout ${user.username} for ${reason}`
        })
      )
      .catch(err => console.log(err))
  }
}
