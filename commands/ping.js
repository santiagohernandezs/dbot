const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('primary')
			.setLabel('Pong')
			.setStyle('PRIMARY'),
);

const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('deploy options!'),
	async execute(interaction) {
		await interaction.reply(

			await interaction.reply({ content: 'Pong!', components: [row], embeds: [embed] }),
		);
	},
};