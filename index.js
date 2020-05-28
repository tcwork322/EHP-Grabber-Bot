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

/* async function getQuote(quoteUrl) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disablesetuid-sandobx'],
	});
	const page = await browser.newPage();
	await page.goto(quoteUrl).catch(e => console.log(e));
	// Get Quote
	const [el] = await page.$x('/html/body/div[8]/div/div/div/div/div/div/table[2]/tbody/tr[1]/td[2]/b');
	const txt = await el.getProperty('textContent');
	const rawTxt = await txt.jsonValue();
	console.log(rawTxt);
	quote = await rawTxt;
	// Get Author
	const [el2] = await page.$x('/html/body/div[8]/div/div/div/div/div/div/table[2]/tbody/tr[1]/td[2]/p/a');
	const txt2 = await el2.getProperty('textContent');
	const rawTxt2 = await txt2.jsonValue();
	console.log(rawTxt2);
	author = await rawTxt2;
	browser.close();
} */

async function updateLabs(updateUrl) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	await page.goto(updateUrl).catch(e => console.log('Expected navigation error, no worries.'));
	browser.close();
}

async function scrapeLabsAlltime(labsUrl) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
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
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
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
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
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
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
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
			message.delete();
			return message.reply('please specify a username.');
		}
		// Concat
		const username = args.join(' ');
		const url = args.join('+');
		// EHP Grabber
		(async () => {
			try {
				message.delete();
				const msg = await message.channel.send('Ah yes! It\'s here somewhere... ' + '`' + username + '`');
				await updateLabs('https://www.crystalmathlabs.com/tracker/update.php?player=' + url);
				await scrapeLabsAlltime('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=all');
				msg.edit('Here it is! Found it!');
				await scrapeLabsYearly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=365d');
				await scrapeLabsMonthly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=31d');
				await scrapeLabsWeekly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url);
				msg.delete();
				// Full Time Stats
				const ehpEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(username)
					.setURL('https://www.crystalmathlabs.com/tracker/track.php?player=' + url)
					.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/tcwork322/EHP-Grabber-Bot')
					.setDescription('EHP info 📈')
					.setThumbnail(client.user.avatarURL())
					.addFields(
						{ name: '**Total EHP** : ', value: allEhp, inline: true },
						{ name: '**Yearly EHP** : ', value: yearlyEhp, inline: true },
						{ name: '**Monthly EHP** : ', value: monthlyEhp, inline: true },
						{ name: '**Weekly EHP** : ', value: weeklyEhp, inline: true },
					)
					.setTimestamp()
					.setFooter(client.user.username, client.user.avatarURL());

				message.channel.send(ehpEmbed);
			}
			catch (err) {
				message.reply('sorry, I\'m too busy to help you right now!' + '(Make sure you entered the right username!)');
				console.error(err);
			}
		})();
	}
	// Clue Command
	if (command === 'clues') {
		const username = args.join(' ');
		console.log('Command Accepted');
		(async () => {
			try {
				const msg = await message.channel.send('I wrote this down, one second... 📜');
				const clueStat = await hiscores.getStats(username);
				msg.delete();
				console.log(clueStat.main.clues);
				const clueEmbed = {
					color: 0x0609A2,
					title: username,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL(),
						urk: 'https://github.com/tcwork322/EHP-Grabber-Bot' },
					description: 'Ah! Here you go!',
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
			catch (err) {
				message.channel.send('Hi-Scores are down or you entered the wrong name, try again.');
				console.log(err);
			}
		})();
	}
	// Quote Command
	if (command === 'quote') {
		const quotes = [
			'I\'ve spent my whole life travelling the world, doing quests for people, saving lives, saving villages from terrifying monsters and all that sort of thing.',
			'Wrong? WRONG? I\'ll tell you what\'s wrong!',
			'Tut tut tut... Oh well, at least you\'ll never be able to tell the bank about me. They\'ll never listen.',
			'Oh yes, it was certainly a fitting end to my adventuring days.',
			'Yes, there was a time, back in the Fourth Age, when we humans wouldn\'t have been able to venture underground. That was before we had magic; the dwarves were quite a threat.',
			'If Entrana is a land dedicated to the glory of Saradomin, the Wilderness is surely the land of Zamorak.',
			'If it\'s jungle you want, look no further than the southern regions of Karamja.',
			'Ah, Uzer. A city much favoured by Saradomin, destroyed by Thammaron, the elder-demon, late in the Third Age.',
			'There\'s a mighty fire-breathing dragon living underground in the deep Wilderness, known as the King Black Dragon. It\'s a fearsome beast, with a breath that can poison you, freeze you to the ground or incinerate you where you stand.',
			'Ha ha ha... There are plenty of heroes. Always have been, always will be, until the fall of the world.',
			'EVEN IF SUCH A CREATURE WERE TO EXIST it would be terribly dangerous for you to get involved in its business.',
			'Indeed, I have heard of adventurers doing the most shameful and blasphemous deeds believing themselves to be acting on behalf of some false god!',
			'Saradomin, the great and glorious, gives life to this world.',
			'Zamorak craves only death and destruction.',
			'Guthix, calling itself a god of \'balance\', holds no allegiance, but simply aids whatever cause suits its shifting purpose.',
			'Very little is written about the tribe of the Mahjarrat. They are believed to be from the realm of Freneskae, or Frenaskrae - the spelling in this tongue is only approximate.',
			'Being noble and virtuous simply doesn\'t put food on the table, and I don\'t intend to sit in banks begging like so many people do these days.',
			'The jungle\'s filled with nasty creatures. There are vicious spiders that you can hardly see before they try to bite your legs off, and great big jungle ogres.',
		];
		message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
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