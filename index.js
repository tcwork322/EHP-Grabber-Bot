const Discord  = require('discord.js');
const Crystalmethlabs = require('crystalmethlabs');
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Discord.Client();
const cml = new Crystalmethlabs();
const osrs = new Crystalmethlabs('osrs');
const prefix = '$!';


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`${prefix}ehp`, { type: 'LISTENING' });
});

client.on('message', async message => {

	// Here's I'm using one of An Idiot's Guide's basic command handlers. Using the PREFIX environment variable above, I can do the same as the bot token below
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'ehp') {
		if (args.length < 1) {
			return message.reply('Please specify a username.')
		}
		// Concat
		const username = args.join(' ');
		const url = args.join('+');
		// Time Frames
		let weekStats;
		let monthlyStats;
		// Async Function to define Month, Week and Day Respectively (Monthly)
		(async () => {
			const month = 24 * 30 * 3600;
			const { err, stats } = await cml.track(username, month);
			if (!err) {
				monthlyStats = stats.ehp.ehpGained;
			}
			else if (err) {
				return message.reply('username cannot be found')
			}
		})();
		// Weekly
		(async () => {
			const week = 24 * 7 * 3600;
			const { err, stats } = await cml.track(username, week);
			if (!err) {
				weekStats = stats.ehp.ehpGained;
			}
		})();
		// Full Time Stats
		(async () => {
			const { err, stats } = await cml.track(username);
			if (!err) {
				setTimeout(function() {
					const ehpEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(username)
						.setURL('https://www.crystalmathlabs.com/tracker/track.php?player=' + url)
						.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/tcwork322/EHP-Grabber-Bot')
						.setDescription('EHP information for user.')
						.setThumbnail(client.user.avatarURL())
						.addFields(
							{ name: 'Total Hours Tracked :', value: stats.ehp.hours },
							{ name: '\u200B', value: '\u200B' },
							{ name: 'Total EHP :', value: stats.ehp.ehpGained, inline: true },
							{ name: 'Monthly EHP :', value: monthlyStats, inline: true },
							{ name: 'Weekly EHP :', value: weekStats, inline: true },
						)
						.setTimestamp()
						.setFooter(client.user.username, client.user.avatarURL());

					message.channel.send(ehpEmbed);
				}, 1000)
			}
		})();
	}
});

// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(process.env.DISCORD_TOKEN);
