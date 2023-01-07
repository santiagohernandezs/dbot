const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to kick').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason').setDescription('The reason for kicking the user')
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user')
    let reason = interaction.options.getString('reason')

    if (!reason) reason = 'No reason provided'

    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(err => console.log(err))

    await user
      .send({
        content: `You have been kicked from ${interaction.guild.name} for ${reason}`
      })
      .catch(console.log(`Could not DM ${user.username}`))

    await member
      .kick(reason)
      .then(
        await interaction.deferReply(),
        await interaction.editReply({
          content: `Kicked ${user.username} for ${reason}`
        })
      )
      .catch(err => console.log(err))
  }
}
