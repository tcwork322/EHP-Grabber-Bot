const Discord = require('discord.js');
const Crystalmethlabs = require('crystalmethlabs');
const hiscores = require('osrs-json-hiscores');
const mysql = require('mysql');
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Discord.Client();
const cml = new Crystalmethlabs();
const osrs = new Crystalmethlabs('osrs');
const prefix = '$!';

const con = mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password: 'testing',
	database: 'sadb',
});


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`${prefix}`, { type: 'LISTENING' });
	con.connect(err => {
		if(err) throw err;
		console.log('Connected to Database');
	});
});

client.on('message', async message => {

	// Here's I'm using one of An Idiot's Guide's basic command handlers. Using the PREFIX environment variable above, I can do the same as the bot token below
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	// EHP Command
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
	// Clue Command
	if (command === 'clues') {
		const username = args.join(' ');
		const clueStat = await hiscores.getStats(username);
		console.log(clueStat.main.clues);
		const clueEmbed = {
			color: 0x0099ff,
			title: username,
			description: 'Data for ' + username + '\'' + 's clues.',
			thumbnail: {
				url: 'https://oldschool.runescape.wiki/images/thumb/f/fc/Clue_scroll_%28master%29_detail.png/150px-Clue_scroll_%28master%29_detail.png?596fb',
			},
			fields: [
				{
					name: '__**All**__',
					value: 'Score: ' + clueStat.main.clues.all.score + '\n' + 'Rank: ' + clueStat.main.clues.all.rank,
				},
				{
					name: '__**Beginner**__',
					value: 'Score: ' + clueStat.main.clues.beginner.score + '\n' + 'Rank: ' + clueStat.main.clues.beginner.rank,
					inline: true,
				},
				{
					name: '__**Easy**__',
					value: 'Score: ' + clueStat.main.clues.easy.score + '\n' + 'Rank: ' + clueStat.main.clues.easy.rank,
					inline: true,
				},
				{
					name: '__**Medium**__',
					value: 'Score: ' + clueStat.main.clues.medium.score + '\n' + 'Rank: ' + clueStat.main.clues.medium.rank,
					inline: true,
				},
				{
					name: '__**Hard**__',
					value: 'Score: ' + clueStat.main.clues.hard.score + '\n' + 'Rank: ' + clueStat.main.clues.hard.rank,
					inline: true,
				},
				{
					name: '__**Elite**__',
					value: 'Score: ' + clueStat.main.clues.elite.score + '\n' + 'Rank: ' + clueStat.main.clues.elite.rank,
					inline: true,
				},
				{
					name: '__**Master**__',
					value: 'Score: ' + clueStat.main.clues.master.score + '\n' + 'Rank: ' + clueStat.main.clues.master.rank,
					inline: true,
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'Wise Old Bot ',
				icon_url: client.user.avatarURL(),
			},
		};
		message.channel.send({ embed: clueEmbed });
	}
	// Login and out commands for mySQL
	if (command === 'login') {
		const username = args.join(' ');
		con.query(`SELECT * FROM login where id = '${message.author.id}'`, (err, rows) => {
			if(err) throw err;

			let sql;

			if(rows.length < 1) {
				sql = `INSERT INTO login(id, osrsname) VALUES ('${message.author.id}', '${username}')`;
				message.reply('Success! Logged in as ' + username + '!');
			}
			else {
				message.reply('You are already logged in. If you want to logout, type' + prefix + 'logout.');
				return;
			}
			con.query(sql, console.log);
		});
	}
	if (command === 'logout') {
		con.query(`SELECT * FROM login where id = '${message.author.id}'`, (err, rows) => {
			if(err) throw err;

			let sql;

			if(rows.length < 1) {
				message.reply('You are not logged in.');
				return;
			}
			else {
				sql = `DELETE FROM login WHERE id='${message.author.id}'`;
				message.reply('You have logged out.');
			}
			con.query(sql, console.log);
		});
	}
});


// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(process.env.DISCORD_TOKEN);
