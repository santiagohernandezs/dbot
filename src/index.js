require('dotenv').config()
const { Client, GatewayIntentBits, Collection } = require('discord.js')
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
client.login(process.env.TOKEN)
;(async () => {
  await connect(process.env.MONGO_DB_URI).catch(err => console.error(err))
})()
