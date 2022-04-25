module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}! Login: Successful`);
        client.user.setActivity('Pornhub', { type: 'WATCHING'})
	},
};
