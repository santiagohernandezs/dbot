const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('UDT')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://live.staticflickr.com/65535/52029869589_f3b20c7453_m.jpg')
    .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('primary')
            .setLabel('Primary')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('Secondary')
            .setLabel('Secondary')
            .setStyle('SECONDARY'),
        new MessageButton()
            .setCustomId('Success')
            .setLabel('Success')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('Danger')
            .setLabel('Danger')
            .setStyle('DANGER'),
        new MessageButton()
            
            .setLabel('Link')
            .setURL('https://www.google.com/')
            .setStyle('LINK'),
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName('complex')
        .setDescription('show a complex embed'),
    async execute(interaction) {
        await interaction.reply(
            ({ embeds: [embed], components: [row] }),
        );
    },
};