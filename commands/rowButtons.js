const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { execute } = require('./complexEmbed');

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

module.exports ={
    data : new SlashCommandBuilder()
        .setName('buttons')
        .setDescription('displays buttons'),
        async execute(interaction){
            await interaction.reply(
                ({ components: [row] }),
                interaction.fetchReply({components: [row], content: 'a button was clicked'})
            )
        }
}