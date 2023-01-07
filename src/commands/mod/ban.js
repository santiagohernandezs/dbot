const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to ban').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for banning the user')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('days')
        .setDescription('The amount of days to ban the user for')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason')
    const days = interaction.options.getInteger('days')

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
      .ban({
        deleteMessageDays: days,
        reason: reason
      })
      .then(
        await interaction.deferReply(),
        await interaction.editReply({
          content: `Banned ${user.username} for ${reason}`
        })
      )
      .catch(err => console.log(err))
  }
}
