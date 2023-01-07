const { Events, InteractionType } = require('discord.js')

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {

    if (interaction.type == InteractionType.ApplicationCommand) {
      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
      }

      try {
        await command.execute(interaction)
        // console.log(id)
      } catch (error) {
        console.error(error)
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        })
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { customId } = interaction

      const modal = interaction.client.modals.get(customId)

      if (!modal) {
        console.error(`No modal matching ${customId} was found.`)
        return
      }

      try {
        await modal.execute(interaction, client)
      } catch (err) {
        console.error(err)
      }
    } else if (interaction.isButton()) {
      const { customId } = interaction

      const button = interaction.client.buttons.get(customId)

      if (!button) {
        console.error(`No button matching ${customId} was found.`)
        return
      }

      try {
        await button.execute(interaction, client)
      } catch (err) {
        console.error(err)
      }
    } else if(interaction.isStringSelectMenu()){
      const { customId } = interaction

      const menu = interaction.client.selectMenus.get(customId)

      if (!menu) {
        console.error(`No menu matching ${customId} was found.`)
        return
      }

      try {
        await menu.execute(interaction, client)
      }
      catch (err) {
        console.error(err)
      }
      
    }
  }
}
