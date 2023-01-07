const { Events, ActivityType } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is ready 🎉!`)
    client.user.setPresence({
      activities: [{ name: 'Escuela de Nada', type: ActivityType.Watching }],
      status: 'online'
    })
  }
}
