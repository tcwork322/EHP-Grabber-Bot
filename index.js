const Discord = require('discord.js');
const hiscores = require('osrs-json-hiscores');
// const mysql = require('mysql');
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Discord.Client();
const puppeteer = require('puppeteer');
const prefix = '$!';
let weeklyEhp;
let monthlyEhp;
let yearlyEhp;
let allEhp;

// Scrape Functions
async function scrapeLabsAlltime(labsUrl) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(labsUrl);

	const [el] = await page.$x('//*[@id="stats_table"]/tbody/tr[26]/td[2]');
	const txt = await el.getProperty('textContent');
	const rawTxt = await txt.jsonValue();
	console.log(rawTxt);
	allEhp = await rawTxt;
	browser.close();
}

async function scrapeLabsYearly(labsUrl) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(labsUrl);

	const [el] = await page.$x('//*[@id="stats_table"]/tbody/tr[26]/td[2]');
	const txt = await el.getProperty('textContent');
	const rawTxt = await txt.jsonValue();
	console.log(rawTxt);
	yearlyEhp = await rawTxt;
	browser.close();
}

async function scrapeLabsMonthly(labsUrl) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(labsUrl);

	const [el] = await page.$x('//*[@id="stats_table"]/tbody/tr[26]/td[2]');
	const txt = await el.getProperty('textContent');
	const rawTxt = await txt.jsonValue();
	console.log(rawTxt);
	monthlyEhp = await rawTxt;
	browser.close();
}
async function scrapeLabsWeekly(labsUrl) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(labsUrl);

	const [el] = await page.$x('//*[@id="stats_table"]/tbody/tr[26]/td[2]');
	const txt = await el.getProperty('textContent');
	const rawTxt = await txt.jsonValue();
	console.log(rawTxt);
	weeklyEhp = await rawTxt;
	browser.close();
}

/* const con = mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password: 'testing',
	database: 'sadb',
}); */


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(prefix, { type: 'LISTENING' });
	/* con.connect(err => {
		if(err) throw err;
		console.log('Connected to Database');
	}); */
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	// Nicknamer Role
	// EHP Command
	if (command === 'ehp') {
		if (args.length < 1) {
			return message.reply('Please specify a username.');
		}
		// Concat
		const username = args.join(' ');
		const url = args.join('+');
		// EHP Grabber
		(async () => {
			try {
				await scrapeLabsAlltime('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=all').catch(console.log('Caught Error'));
				await scrapeLabsYearly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=365d');
				await scrapeLabsMonthly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=31d');
				await scrapeLabsWeekly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url);
				// Full Time Stats
				const ehpEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(username)
					.setURL('https://www.crystalmathlabs.com/tracker/track.php?player=' + url)
					.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/tcwork322/EHP-Grabber-Bot')
					.setDescription('EHP information for user.')
					.setThumbnail(client.user.avatarURL())
					.addFields(
						{ name: 'Total Hours Tracked :', value: 'Shrug' },
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Total EHP :', value: allEhp, inline: true },
						{ name: 'Yearly EHP :', value: yearlyEhp, inline: true },
						{ name: 'Monthly EHP :', value: monthlyEhp, inline: true },
						{ name: 'Weekly EHP :', value: weeklyEhp, inline: true },
					)
					.setTimestamp()
					.setFooter(client.user.username, client.user.avatarURL());

				message.channel.send(ehpEmbed);
			}
			catch {
				message.reply('error occured, most likely the scraper was blocked by CML, try again.');
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
	/* if (command === 'login') {
		const username = args.join(' ');
		const verifyStats = await hiscores.getStats(username).catch(err => message.reply(err + '.'));
		const verifyUsername = Object.prototype.hasOwnProperty.call(verifyStats, 'main');
		if(verifyUsername === true) {
			con.query(`SELECT * FROM global where id = '${message.author.id}' AND server = '${message.guild.id}'`, (err, rows) => {
				if(err) throw err;

				let sql;

				if(rows.length < 1) {
					sql = `INSERT INTO global (name, id, osrsname, server) VALUES ('${message.author.username}', '${message.author.id}', '${username}', '${message.guild.id}')`;
					message.reply('Success! Logged in as ' + username + '!');
				}
				else {
					message.reply('You are already logged in. If you want to logout, type ' + prefix + 'logout.');
					return;
				}
				con.query(sql, console.log);
			});
		}
		else {
			return;
		}
	}

	if (command === 'logout') {
		con.query(`SELECT * FROM global where id = '${message.author.id}' AND server = '${message.guild.id}'`, (err, rows) => {
			if(err) throw err;

			let sql;

			if(rows.length < 1) {
				message.reply('You are not logged in.');
				return;
			}
			else {
				sql = `DELETE FROM global WHERE id='${message.author.id}' AND server = '${message.guild.id}`;
				message.reply('You have logged out.');
			}
			con.query(sql, console.log);
		});
	}

	if (command === 'debug') {
		const guildIds = client.guilds.cache.filter(g => g.id == message.guild.id).map(g => g.members);
		// console.log(guildNames);
		// console.log(usernames);
		// console.log(client.users.cache);
		console.log(guildIds);
	}*/
});

// Notes for future, when weekly challenge starts, get osrs hiscores for selected boss and add to db, every 4 hrs subtract database kc from new kc to get current score
// Add column for username also.
// Add extra two columns to tables determining start and end kc for bosses to work out scoreboard.
// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(process.env.DISCORD_TOKEN);