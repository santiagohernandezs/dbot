const fs = require('fs')
const { REST, Routes } = require('discord.js')

module.exports = client => {
  client.handleCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
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
      console.log(
        '🚀 ~ file: commands.js:21 ~ client.handleCommands= ~ commandsFolder',
        commandsFolder
      )

      for (const file of commandsFolder) {
        const command = require(`../../commands/${folder}/${file}`)
        if ('data' in command && 'execute' in command) {
          commands.set(command.data.name, command)
          commandsArray.push(command.data.toJSON())
        }
      }
    }

    try {
      console.log(`Registrando ${commandsArray.length} comandos...`)
      await rest
        .put(Routes.applicationCommands(process.env.APPLICATION_ID), {
          body: commandsArray
        })
        .then(() => console.log('Comandos registrados correctamente.'))
    } catch (err) {
      console.error(err)
    }
  }
}
