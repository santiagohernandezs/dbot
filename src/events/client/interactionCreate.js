const { Events, InteractionType } = require('discord.js')

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {
    if (InteractionType.ApplicationCommand) {
      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
      }

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        })
      }
    } else if (interaction.isButton()) {
      const { buttons } = client
      const { customId } = interaction

      const button = buttons.get(customId)

      if (!button) {
        console.error(`No button matching ${customId} was found.`)
        return
      }

      try {
        await button.execute(interaction, client)
      } catch (err) {
        console.error(err)
        await interaction.reply({
          content: 'There was an error while executing this button!',
          ephemeral: true
        })
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client
      const { customId } = interaction

      const modal = modals.get(customId)

      if (!modal) {
        console.error(`No modal matching ${customId} was found.`)
        return
      }

      try {
        await modal.execute(interaction, client)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
