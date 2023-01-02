const fs = require('fs')
const { token, application_id, guild_id } = require('../../../config.json')
const { REST, Routes } = require('discord.js')

module.exports = client => {
  client.handleCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(token)
    const { commands } = client
    const commandsArray = []

    const commandsPath = await fs.readdirSync('./src/commands')
    console.log(
      '🚀 ~ file: commands.js:7 ~ client.handleCommands= ~ commandsPath',
      commandsPath
    )

    for (folder of commandsPath) {
      const commandsFolder = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter(file => file.endsWith('.js'))

      for (const file of commandsFolder) {
        const command = require(`../../commands/${folder}/${file}`)
        if ('data' in command && 'execute' in command) {
          console.log(
            '🚀 ~ file: commands.js:23 ~ client.handleCommands= ~ command',
            file
          )
          commands.set(command.data.name, command)
          commandsArray.push(command.data.toJSON())
        }
      }
    }

    try {
      console.log(`Registrando ${commandsArray.length} comandos...`)
      await rest
        .put(Routes.applicationGuildCommands(application_id, guild_id), {
          body: commandsArray,
        })
        .then(() => console.log('Comandos registrados correctamente.'))
    } catch (err) {
      console.error(err)
    }
  }
}
