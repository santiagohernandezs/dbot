const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')
const Canvas = require('@napi-rs/canvas')
const { request } = require('undici')
const path = require('path')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Muestra tu perfil')
    .addUserOption(option =>
      option.setName('usuario').setDescription('El usuario del que quieres ver el perfil')
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario') || interaction.user

    const background = await Canvas.loadImage(
      path.join(__dirname, 'images', 'wallpaper.jpg')
    )
    const canvas = Canvas.createCanvas(700, 250)
    const context = canvas.getContext('2d')

    context.drawImage(background, 0, 0, canvas.width, canvas.height)

    const { body } = await request(user.displayAvatarURL({ extension: 'jpg' }))
    const avatar = await Canvas.loadImage(await body.arrayBuffer())

    context.font = '40px montserrat'
    context.fillStyle = '#ffffff'
    context.fillText(user.username, canvas.width / 2.5, canvas.height / 2.3)
    context.fillText(user.tag, canvas.width / 2.5, canvas.height / 1.6)

    context.beginPath()
    context.arc(125, 125, 100, 0, Math.PI * 2, true)
    context.closePath()

    context.clip()
    context.drawImage(avatar, 25, 25, 200, 200)

    const attachment = new AttachmentBuilder(await canvas.encode('png'), {
      name: 'profile-image.png'
    })

    interaction.reply({ files: [attachment] })
  }
}
