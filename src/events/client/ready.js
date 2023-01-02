const { Events } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is ready 🎉!`)
    client.user.setPresence({
      activities: [{ name: 'discord.js' }],
      status: 'dnd'
    })
  }
}
