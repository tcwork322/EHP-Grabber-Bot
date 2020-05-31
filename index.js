const Discord = require('discord.js');
const hiscores = require('osrs-json-hiscores');
const Canvas = require('canvas');
Canvas.registerFont('Runescape-Chat-07.ttf', { family: 'RunescapeUF', weight: '200' });
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

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(prefix, { type: 'LISTENING' });
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;
	// Get Emotes
	const overall = client.emojis.cache.find(emoji => emoji.name === 'overall');
	const attack = client.emojis.cache.find(emoji => emoji.name === 'attack');
	const defence = client.emojis.cache.find(emoji => emoji.name === 'defence');
	const strength = client.emojis.cache.find(emoji => emoji.name === 'strength');
	const hitpoints = client.emojis.cache.find(emoji => emoji.name === 'hitpoints');
	const ranged = client.emojis.cache.find(emoji => emoji.name === 'ranged');
	const prayer = client.emojis.cache.find(emoji => emoji.name === 'prayer');
	const magic = client.emojis.cache.find(emoji => emoji.name === 'magic');
	const cooking = client.emojis.cache.find(emoji => emoji.name === 'cooking');
	const woodcutting = client.emojis.cache.find(emoji => emoji.name === 'woodcutting');
	const fletching = client.emojis.cache.find(emoji => emoji.name === 'fletching');
	const fishing = client.emojis.cache.find(emoji => emoji.name === 'fishing');
	const firemaking = client.emojis.cache.find(emoji => emoji.name === 'crafting');
	const crafting = client.emojis.cache.find(emoji => emoji.name === 'crafting');
	const smithing = client.emojis.cache.find(emoji => emoji.name === 'smithing');
	const mining = client.emojis.cache.find(emoji => emoji.name === 'mining');
	const herblore = client.emojis.cache.find(emoji => emoji.name === 'herblore');
	const agility = client.emojis.cache.find(emoji => emoji.name === 'agility');
	const thieving = client.emojis.cache.find(emoji => emoji.name === 'thieving');
	const slayer = client.emojis.cache.find(emoji => emoji.name === 'slayer');
	const farming = client.emojis.cache.find(emoji => emoji.name === 'farming');
	const runecrafting = client.emojis.cache.find(emoji => emoji.name === 'runecrafting');
	const hunter = client.emojis.cache.find(emoji => emoji.name === 'hunter');
	const construction = client.emojis.cache.find(emoji => emoji.name === 'construction');
	const dawn = client.emojis.cache.find(emoji => emoji.name === 'Dawn');
	const kraken = client.emojis.cache.find(emoji => emoji.name === 'Kraken');
	const thermo = client.emojis.cache.find(emoji => emoji.name === 'Thermonuclear');
	const cerb = client.emojis.cache.find(emoji => emoji.name === 'Cerb');
	const sire = client.emojis.cache.find(emoji => emoji.name === 'Sire');
	const hydra = client.emojis.cache.find(emoji => emoji.name === 'Hydra');
	const fanatic = client.emojis.cache.find(emoji => emoji.name === 'fanatic');
	const archaeologist = client.emojis.cache.find(emoji => emoji.name === 'archaeologist');
	const scorpia = client.emojis.cache.find(emoji => emoji.name === 'scorpia');
	const kbd = client.emojis.cache.find(emoji => emoji.name === 'kbd');
	const elemental = client.emojis.cache.find(emoji => emoji.name === 'elemental');
	const vetion = client.emojis.cache.find(emoji => emoji.name === 'vetion');
	const venenatis = client.emojis.cache.find(emoji => emoji.name === 'spooder');
	const callisto = client.emojis.cache.find(emoji => emoji.name === 'callisto');
	const obor = client.emojis.cache.find(emoji => emoji.name === 'obor');
	const bryo = client.emojis.cache.find(emoji => emoji.name === 'byro');
	const mimic = client.emojis.cache.find(emoji => emoji.name === 'mimic');
	const hespori = client.emojis.cache.find(emoji => emoji.name === 'hespori');
	const skotizo = client.emojis.cache.find(emoji => emoji.name === 'skotizo');
	const zalcano = client.emojis.cache.find(emoji => emoji.name === 'zalcano');
	const olm = client.emojis.cache.find(emoji => emoji.name === 'olm');
	const tob = client.emojis.cache.find(emoji => emoji.name === 'tob');
	const barb = client.emojis.cache.find(emoji => emoji.name === 'penance');
	const gauntlet = client.emojis.cache.find(emoji => emoji.name === 'gauntlet');
	const jad = client.emojis.cache.find(emoji => emoji.name === 'jad');
	const zuk = client.emojis.cache.find(emoji => emoji.name === 'zuk');
	const mole = client.emojis.cache.find(emoji => emoji.name === 'mole');
	const supreme = client.emojis.cache.find(emoji => emoji.name === 'supreme');
	const rex = client.emojis.cache.find(emoji => emoji.name === 'rex');
	const prime = client.emojis.cache.find(emoji => emoji.name === 'prime');
	const sarachnis = client.emojis.cache.find(emoji => emoji.name === 'sarachnis');
	const kalphite = client.emojis.cache.find(emoji => emoji.name === 'kq');
	const kree = client.emojis.cache.find(emoji => emoji.name === 'armadyl');
	const sara = client.emojis.cache.find(emoji => emoji.name === 'saradomin');
	const bandos = client.emojis.cache.find(emoji => emoji.name === 'bandos');
	const kril = client.emojis.cache.find(emoji => emoji.name === 'zamorak');
	const zulrah = client.emojis.cache.find(emoji => emoji.name === 'zulrah');
	const vorkath = client.emojis.cache.find(emoji => emoji.name === 'vorkath');
	const corp = client.emojis.cache.find(emoji => emoji.name === 'corp');
	const nightmare = client.emojis.cache.find(emoji => emoji.name === 'nightmare');

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
					.setColor('#0609A2')
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
		if (args.length < 1) {
			message.delete();
			return message.reply('are you mentally deficient?? I can\'t find nobody!');
		}
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
	// Total XP Commands
	if (command === 'stats') {
		// Coord note
		// Title 101 x 13 
		// Total 163 x 277
		// first skill starts at 40
		/*
		78
		111
		144
		177
		210
		243
		276
		309
		*/
		//

		(async () => {
			const username = args.join(' ');
			let iconCord;
			let textCord;
			try {
				const msg = await message.channel.send('Hold on one second...');
				const stats = await hiscores.getStats(username);
				msg.delete();
				if(stats.main.skills.overall.xp < 1000000) {
					iconCord = 140;
					textCord = 156;
				}
				else if(stats.main.skills.overall.xp < 10000000) {
					iconCord = 135;
					textCord = 151;
				}
				else if(stats.main.skills.overall.xp < 100000000) {
					iconCord = 130;
					textCord = 146;
				}
				else if(stats.main.skills.overall.xp < 1000000000) {
					iconCord = 125;
					textCord = 141;
				}
				else {
					iconCord = 118;
					textCord = 134;
				}
				// Canvas Init
				const canvas = Canvas.createCanvas(202, 297);
				const ctx = canvas.getContext('2d');
				// Background Loading Canvas
				const background = await Canvas.loadImage('./runescape_stats.png');
				const overallPng = await Canvas.loadImage('./overall.png');
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 13px RunescapeUF';
				ctx.fillStyle = '#FFFF00';
				// First Column Skills
				ctx.fillText(stats.main.skills.attack.level, 39, 45);
				ctx.fillText(stats.main.skills.attack.level, 53, 57);
				ctx.fillText(stats.main.skills.strength.level, 39, 77);
				ctx.fillText(stats.main.skills.strength.level, 53, 90);
				ctx.fillText(stats.main.skills.defence.level, 39, 109);
				ctx.fillText(stats.main.skills.defence.level, 53, 122);
				ctx.fillText(stats.main.skills.ranged.level, 39, 141);
				ctx.fillText(stats.main.skills.ranged.level, 53, 154);
				ctx.fillText(stats.main.skills.prayer.level, 39, 173);
				ctx.fillText(stats.main.skills.prayer.level, 53, 186);
				ctx.fillText(stats.main.skills.magic.level, 39, 205);
				ctx.fillText(stats.main.skills.magic.level, 53, 218);
				ctx.fillText(stats.main.skills.runecraft.level, 39, 237);
				ctx.fillText(stats.main.skills.runecraft.level, 53, 250);
				ctx.fillText(stats.main.skills.construction.level, 39, 269);
				ctx.fillText(stats.main.skills.construction.level, 53, 282);
				// Second Column Skills
				ctx.fillText(stats.main.skills.hitpoints.level, 102, 45);
				ctx.fillText(stats.main.skills.hitpoints.level, 116, 57);
				ctx.fillText(stats.main.skills.agility.level, 102, 77);
				ctx.fillText(stats.main.skills.agility.level, 116, 90);
				ctx.fillText(stats.main.skills.herblore.level, 102, 109);
				ctx.fillText(stats.main.skills.herblore.level, 116, 122);
				ctx.fillText(stats.main.skills.thieving.level, 102, 141);
				ctx.fillText(stats.main.skills.thieving.level, 116, 154);
				ctx.fillText(stats.main.skills.crafting.level, 102, 173);
				ctx.fillText(stats.main.skills.crafting.level, 116, 186);
				ctx.fillText(stats.main.skills.fletching.level, 102, 205);
				ctx.fillText(stats.main.skills.fletching.level, 116, 218);
				ctx.fillText(stats.main.skills.slayer.level, 102, 237);
				ctx.fillText(stats.main.skills.slayer.level, 116, 250);
				ctx.fillText(stats.main.skills.hunter.level, 102, 269);
				ctx.fillText(stats.main.skills.hunter.level, 116, 282);
				// Third Column Skills
				ctx.fillText(stats.main.skills.mining.level, 165, 45);
				ctx.fillText(stats.main.skills.mining.level, 179, 57);
				ctx.fillText(stats.main.skills.smithing.level, 165, 77);
				ctx.fillText(stats.main.skills.smithing.level, 179, 90);
				ctx.fillText(stats.main.skills.fishing.level, 165, 109);
				ctx.fillText(stats.main.skills.fishing.level, 179, 122);
				ctx.fillText(stats.main.skills.cooking.level, 165, 141);
				ctx.fillText(stats.main.skills.cooking.level, 179, 154);
				ctx.fillText(stats.main.skills.firemaking.level, 165, 173);
				ctx.fillText(stats.main.skills.firemaking.level, 179, 186);
				ctx.fillText(stats.main.skills.woodcutting.level, 165, 205);
				ctx.fillText(stats.main.skills.woodcutting.level, 179, 218);
				ctx.fillText(stats.main.skills.farming.level, 165, 237);
				ctx.fillText(stats.main.skills.farming.level, 179, 250);
				// Username and Total Level
				ctx.fillText(username, 10, 19);
				ctx.font = '200 11px RunescapeUF';
				ctx.drawImage(overallPng, iconCord, 8);
				ctx.fillText(stats.main.skills.overall.xp, textCord, 19);
				ctx.fillText(stats.main.skills.overall.level, 153, 283);
				console.log(stats.main.skills);
				// Assign canvas to attachment
				const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'runescapestats.png');
				message.channel.send('Here you go!', attachment);

			}
			catch (err) {
				console.log(err);
				message.reply('sorry, I\'m too busy to help you right now.');
			}
		})();
	}
});

// Notes for future, when weekly challenge starts, get osrs hiscores for selected boss and add to db, every 4 hrs subtract database kc from new kc to get current score
// Add column for username also.
// Add extra two columns to tables determining start and end kc for bosses to work out scoreboard.
// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(process.env.DISCORD_TOKEN);