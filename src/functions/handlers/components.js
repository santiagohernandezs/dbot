const fs = require('fs')

module.exports = client => {
  client.handleComponents = async () => {
    const componentsFolder = fs.readdirSync('./src/components')
    for (const folder of componentsFolder) {
      const component = fs
        .readdirSync(`./src/components/${folder}`)
        .filter(file => file.endsWith('.js'))

      const { buttons } = client
      switch (folder) {
        case 'buttons':
          for (const file of component) {
            const button = require(`../../components/${folder}/${file}`)
            buttons.set(button.data.name, button)
          }
          break

        default:
          break
      }
    }
  }
}
