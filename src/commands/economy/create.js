const { SlashCommandBuilder } = require('discord.js')
const Gift = require('../../Schemas/gift')
const { mongoose } = require('mongoose')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a gift')
    .addStringOption(option =>
      option.setName('name').setDescription('The name of the gift').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('The description of the gift')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('price').setDescription('The price of the gift').setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name')
    const description = interaction.options.getString('description')
    const price = interaction.options.getInteger('price')

    let giftName = await Gift.findOne({ name: name })

    if (!giftName) {
      const gift = new Gift({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description: description,
        price: price
      })

      await gift.save().catch(err => console.log(err))

      await interaction.reply({
        content: `Gift created!`
      })
    } else {
      await interaction.reply({
        content: `Gift with the name ${name} already exists!`
      })
    }
  }
}
