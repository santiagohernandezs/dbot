const { ModalSubmitFields } = require('discord.js')
const fs = require('fs')

module.exports = client => {
  client.handleComponents = async () => {
    const componentsFolder = fs.readdirSync('./src/components')
    for (const folder of componentsFolder) {
      const component = fs
        .readdirSync(`./src/components/${folder}`)
        .filter(file => file.endsWith('.js'))

      const { buttons, modals } = client
      switch (folder) {
        case 'buttons':
          for (const file of component) {
            const button = require(`../../components/${folder}/${file}`)
            buttons.set(button.data.name, button)
          }
          break

        case 'menus':
          for (const file of component) {
            const menu = require(`../../components/${folder}/${file}`)
            menus.set(menu.data.name, menu)
          }
          break

        case 'modals':
          for (const file of component) {
            const modal = require(` ../../components/${folder}/${file}`)
            modals.set(modal.data.name, modal)
          }
          break

        default:
          break
      }
    }
  }
}
