const fs = require('fs')
const { connection } = require('mongoose')

module.exports = client => {
  client.handleEvents = async () => {
    const eventsPath = await fs.readdirSync('./src/events')
    console.log('🚀 ~ file: events.js:6 ~ client.handleEvents= ~ eventsPath', eventsPath)

    for (folder of eventsPath) {
      const eventsFolder = fs
        .readdirSync(`./src/events/${folder}`)
        .filter(file => file.endsWith('.js'))
      console.log(
        '🚀 ~ file: events.js:12 ~ client.handleEvents= ~ eventsFolder',
        eventsFolder
      )

      switch (folder) {
        case 'client':
          for (const file of eventsFolder) {
            const event = require(`../../events/${folder}/${file}`)
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args))
            } else {
              client.on(event.name, (...args) => event.execute(...args))
            }
          }
          break

        case 'mongo':
          for (const file of eventsFolder) {
            const event = require(`../../events/${folder}/${file}`)
            if (event.once) {
              connection.once(event.name, (...args) => event.execute(...args))
            } else {
              connection.on(event.name, (...args) => event.execute(...args))
            }
          }
          break
        default:
          break
      }
    }
  }
}
