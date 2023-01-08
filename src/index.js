const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { token, db_token } = require('../config.json')
const { connect } = require('mongoose')
const fs = require('fs')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
})

client.commands = new Collection()
client.selectMenus = new Collection()
client.modals = new Collection()
client.buttons = new Collection()

const functionsFolder = fs.readdirSync('./src/functions')

for (const folder of functionsFolder) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'))
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client)
  }
}

client.handleEvents()
client.handleCommands()
client.handleComponents()
client.login(token)
;(async () => {
  await connect(db_token).catch(err => console.error(err))
})()
