const Discord = require('discord.js');
const hiscores = require('osrs-json-hiscores');
const GIFEncoder = require('gifencoder');
const fs = require('fs');
const Canvas = require('canvas');
Canvas.registerFont('./resources/RuneScapeChat.ttf', { family: 'RunescapeUF', weight: '200' });
Canvas.registerFont('./resources/runescape_large.ttf', { family: 'RunescapeLarge', weight: '200' });
// const mysql = require('mysql');
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();


const client = new Discord.Client();
const puppeteer = require('puppeteer');
const prefix = '$!';

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
	browser.close();
	return await Math.round(parseFloat(rawTxt.replace(/,/g, '')));
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
	browser.close();
	return await Math.round(parseFloat(rawTxt.replace(/,/g, '')));
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
	browser.close();
	return await Math.round(parseFloat(rawTxt.replace(/,/g, '')));
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
	browser.close();
	return await Math.round(parseFloat(rawTxt.replace(/,/g, '')));
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
	const hardcore = client.emojis.cache.find(emoji => emoji.name === 'hardcoreSymbol');
	const ultimate = client.emojis.cache.find(emoji => emoji.name === 'ultimateSymbol');
	const iron = client.emojis.cache.find(emoji => emoji.name === 'ironSymbol');
	// Boss Emotes
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
	const bryo = client.emojis.cache.find(emoji => emoji.name === 'bryo');
	const mimic = client.emojis.cache.find(emoji => emoji.name === 'mimic');
	const hespori = client.emojis.cache.find(emoji => emoji.name === 'hespori');
	const skotizo = client.emojis.cache.find(emoji => emoji.name === 'skotizo');
	const zalcano = client.emojis.cache.find(emoji => emoji.name === 'zalcano');
	const olm = client.emojis.cache.find(emoji => emoji.name === 'raids');
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
	const barrows = client.emojis.cache.find(emoji => emoji.name === 'barrows');
	const corrupted = client.emojis.cache.find(emoji => emoji.name === 'corrupted');
	const league = client.emojis.cache.find(emoji => emoji.name === 'league');
	const pvp = client.emojis.cache.find(emoji => emoji.name === 'pvp');
	const lms = client.emojis.cache.find(emoji => emoji.name === 'lms');

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
				const allEhp = await scrapeLabsAlltime('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=all');
				const yearlyEhp = await scrapeLabsYearly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=365d');
				msg.edit('Here it is! Found it!');
				const monthlyEhp = await scrapeLabsMonthly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url + '&time=31d');
				const weeklyEhp = await scrapeLabsWeekly('https://www.crystalmathlabs.com/tracker/track.php?player=' + url);
				msg.delete();
				// Start Gif Encoder
				const encoder = new GIFEncoder(518, 140);
				encoder.createReadStream().pipe(fs.createWriteStream('./resources/ehpanimated.gif'));
				encoder.start();
				encoder.setRepeat(0);
				encoder.setDelay(150);
				encoder.setQuality(256);
				// Construct Canvas
				const canvas = Canvas.createCanvas(518, 140);
				const ctx = canvas.getContext('2d');
				// weeklyEhp;
				//  monthlyEhp;
				//  yearlyEhp;
				//  allEhp;
				// Load background and set font-style
				const frameOne = await Canvas.loadImage('./resources/frame1.png');
				const frameTwo = await Canvas.loadImage('./resources/frame2.png');
				const frameThree = await Canvas.loadImage('./resources/frame3.png');
				const frameFour = await Canvas.loadImage('./resources/frame4.png');
				const frameFive = await Canvas.loadImage('./resources/frame5.png');
				const frameSix = await Canvas.loadImage('./resources/frame6.png');
				const frameSeven = await Canvas.loadImage('./resources/frame7.png');
				const frameEight = await Canvas.loadImage('./resources/frame8.png');
				ctx.drawImage(frameOne, 0, 0, canvas.width, canvas.height);
				// Add text and co-ords
				ctx.textAlign = 'center';
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameTwo, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameThree, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameFour, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameFive, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameSix, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameSeven, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);

				ctx.drawImage(frameEight, 0, 0, canvas.width, canvas.height);
				ctx.font = '200 22px RunescapeLarge';
				ctx.fillStyle = '#a30000';
				ctx.fillText('Wise Old Bot (EHP Info)', 300, 30);

				ctx.font = '200 20px RunescapeLarge';
				ctx.fillStyle = '#433DDB';
				ctx.fillText('Click here to continue.', 300, 120);

				ctx.font = '200 19px RunescapeLarge';
				ctx.fillStyle = 'black';
				ctx.fillText('Here you go,' + ' ' + username, 300, 60);
				ctx.fillText('Total: ' + allEhp, 195, 86);
				ctx.fillText('Yearly: ' + yearlyEhp, 280, 86);
				ctx.fillText('Monthly: ' + monthlyEhp, 365, 86);
				ctx.fillText('Weekly: ' + weeklyEhp, 450, 86);
				ctx.fillStyle = '#a30000';
				encoder.addFrame(ctx);
				encoder.finish();
				// Assign canvas to attachment and send
				const attachment = new Discord.MessageAttachment('./resources/ehpanimated.gif');
				message.channel.send(attachment);
			}
			catch (err) {
				message.reply('sorry, I\'m too busy to help you right now! ' + '(Make sure you entered the right username!)');
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
							value: 'Score: ' + clueStat.main.clues.all.score + '\n' + '**Rank:** ' + clueStat.main.clues.all.rank,
						},
						{
							name: '__**Beginner**__',
							value: 'Score: ' + clueStat.main.clues.beginner.score + '\n' + '**Rank:** ' + clueStat.main.clues.beginner.rank,
							inline: true,
						},
						{
							name: '__**Easy**__',
							value: 'Score: ' + clueStat.main.clues.easy.score + '\n' + '**Rank:** ' + clueStat.main.clues.easy.rank,
							inline: true,
						},
						{
							name: '__**Medium**__',
							value: 'Score: ' + clueStat.main.clues.medium.score + '\n' + '**Rank:** ' + clueStat.main.clues.medium.rank,
							inline: true,
						},
						{
							name: '__**Hard**__',
							value: 'Score: ' + clueStat.main.clues.hard.score + '\n' + '**Rank:** ' + clueStat.main.clues.hard.rank,
							inline: true,
						},
						{
							name: '__**Elite**__',
							value: 'Score: ' + clueStat.main.clues.elite.score + '\n' + '**Rank:** ' + clueStat.main.clues.elite.rank,
							inline: true,
						},
						{
							name: '__**Master**__',
							value: 'Score: ' + clueStat.main.clues.master.score + '\n' + '**Rank:** ' + clueStat.main.clues.master.rank,
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
	// Total Stats Command
	if (command === 'stats') {
		(async () => {
			const username = args.join(' ');
			let iconCord;
			let textCord;
			let userCord;
			try {
				const msg = await message.channel.send('Hold on one second...');
				const stats = await hiscores.getStats(username);
				msg.delete();
				if(stats.main.skills.overall.xp < 1000000) {
					iconCord = 140;
					textCord = 156;
				}
				else if(stats.main.skills.overall.xp < 10000000) {
					iconCord = 133;
					textCord = 149;
				}
				else if(stats.main.skills.overall.xp < 100000000) {
					iconCord = 123;
					textCord = 139;
				}
				else if(stats.main.skills.overall.xp < 1000000000) {
					iconCord = 122;
					textCord = 138;
				}
				else {
					iconCord = 108;
					textCord = 124;
				}
				// Canvas Init
				const canvas = Canvas.createCanvas(202, 297);
				const ctx = canvas.getContext('2d', { pixelFormat: 'RGB24' });
				// Background Loading Canvas
				const background = await Canvas.loadImage('./resources/runescape_stats.png');
				const overallPng = await Canvas.loadImage('./resources/overall.png');
				const hardcoreSymbol = await Canvas.loadImage('./resources/hardcoreSymbol.png');
				const ultimateSymbol = await Canvas.loadImage('./resources/ultimateSymbol.png');
				const ironSymbol = await Canvas.loadImage('./resources/ironSymbol.png');
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				if(stats.mode === 'hardcore') {
					userCord = 22;
					ctx.drawImage(hardcoreSymbol, 9, 9);
				}
				if (stats.mode === 'ultimate') {
					userCord = 24;
					ctx.drawImage(ultimateSymbol, 9, 9);
				}
				if (stats.mode === 'ironman') {
					userCord = 22;
					ctx.drawImage(ironSymbol, 9, 9);
				}
				if (stats.mode === 'main') {
					userCord = 10;
				}
				ctx.font = '200 13px RunescapeUF';
				ctx.fillStyle = '#ffff00';
				ctx.translate(0.5, 0.5);
				ctx.quality = 'best';
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
				ctx.fillText(username, userCord, 19);
				ctx.font = '200 12px RunescapeUF';
				ctx.drawImage(overallPng, iconCord, 8);
				const overallXp = stats.main.skills.overall.xp.toString().split('.');
				overallXp[0] = overallXp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				ctx.fillText(overallXp, textCord, 19);
				ctx.font = '200 12px RunescapeUF';
				ctx.fillText(stats.main.skills.overall.level, 154, 283);
				console.log(stats.mode);
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
	// Killcount Command
	if (command === 'kc') {
		const msg = await message.channel.send('Give me a minute...');
		let username = args.join(' ');
		(async () => {
			try {
				const stats = await hiscores.getStats(username);
				if (stats.mode === 'hardcore') {
					username = `${hardcore} ` + username;
				}
				if (stats.mode === 'ultimate') {
					username = `${ultimate} ` + username;
				}
				if (stats.mode === 'ironman') {
					username = `${iron} ` + username;
				}
				msg.delete();
				const bosses = stats.main.bosses;
				const bhKills = stats.main.bountyHunter.rogue.score + stats.main.bountyHunter.hunter.score;
				const kcEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('KC for ' + username)
					.setDescription('Got it!')
					.setAuthor(client.user.username, client.user.avatarURL())
					.setThumbnail('https://oldschool.runescape.wiki/images/d/da/Slayer_helmet_detail.png?7151d')
					.setTimestamp()
					.setFooter(client.user.username, client.user.avatarURL());
				if (bosses.abyssalSire.score > 1) {
					kcEmbed.addField(`${sire} Sire‏‏‎ ‎‏‏‎`, '**Kills:** ' + bosses.abyssalSire.score + '\n' + '**Rank:** ' + bosses.abyssalSire.rank, true);
				}
				if (bosses.alchemicalHydra.score > 1) {
					kcEmbed.addField(`${hydra} Hydra`, '**Kills:** ' + bosses.alchemicalHydra.score + '\n' + '**Rank:** ' + bosses.alchemicalHydra.rank, true);
				}
				if (bosses.barrows.score > 1) {
					kcEmbed.addField(`${barrows} Barrows‏‏‎ ‎‏‏‎`, '**Kills:** ' + bosses.barrows.score + '\n' + '**Rank:** ' + bosses.barrows.rank, true);
				}
				if (bosses.bryophyta.score > 1) {
					kcEmbed.addField(`${bryo} Bryo‏‏‎ ‎‏‏‎`, '**Kills:** ' + bosses.bryophyta.score + '\n' + '**Rank:** ' + bosses.bryophyta.rank, true);
				}
				if (bosses.callisto.score > 1) {
					kcEmbed.addField(`${callisto} Callisto ‎‏‏‎`, '**Kills:** ' + bosses.callisto.score + '\n' + '**Rank:** ' + bosses.callisto.rank, true);
				}
				if (bosses.cerberus.score > 1) {
					kcEmbed.addField(`${cerb} Cerberus ‎‏‏‎`, '**Kills:** ' + bosses.cerberus.score + '\n' + '**Rank:** ' + bosses.cerberus.rank, true);
				}
				if (bosses.chambersOfXeric.score > 1) {
					kcEmbed.addField(`${olm} CoX (Normal) ‎‏‏‎`, '**Kills:** ' + bosses.chambersOfXeric.score + '\n' + '**Rank:** ' + bosses.chambersOfXeric.rank, true);
				}
				if (bosses.chambersOfXericChallengeMode.score > 1) {
					kcEmbed.addField(`${olm} CoX (CM) ‎‏‏‎`, '**Kills:** ' + bosses.chambersOfXericChallengeMode.score + '\n' + '**Rank:** ' + bosses.chambersOfXericChallengeMode.rank, true);
				}
				if (bosses.chaosElemental.score > 1) {
					kcEmbed.addField(`${elemental} Chaos Elemental ‎‏‏‎`, '**Kills:** ' + bosses.chaosElemental.score + '\n' + '**Rank:** ' + bosses.chaosElemental.rank, true);
				}
				if (bosses.chaosFanatic.score > 1) {
					kcEmbed.addField(`${fanatic} Chaos Fanatic ‎‏‏‎`, '**Kills:** ' + bosses.chaosFanatic.score + '\n' + '**Rank:** ' + bosses.chaosFanatic.rank, true);
				}
				if (bosses.commanderZilyana.score > 1) {
					kcEmbed.addField(`${sara} Sara ‎‏‏‎`, '**Kills:** ' + bosses.commanderZilyana.score + '\n' + '**Rank:** ' + bosses.commanderZilyana.rank, true);
				}
				if (bosses.corporealBeast.score > 1) {
					kcEmbed.addField(`${corp} Corporeal Beast ‎‏‏‎`, '**Kills:** ' + bosses.corporealBeast.score + '\n' + '**Rank:** ' + bosses.corporealBeast.rank, true);
				}
				if (bosses.crazyArchaeologist.score > 1) {
					kcEmbed.addField(`${archaeologist} Crazy Archaeologist‎‏‏‎`, '**Kills:** ' + bosses.crazyArchaeologist.score + '\n' + '**Rank:** ' + bosses.crazyArchaeologist.rank, true);
				}
				if (bosses.dagannothPrime.score > 1) {
					kcEmbed.addField(`${prime} Prime`, '**Kills:** ' + bosses.dagannothPrime.score + '\n' + '**Rank:** ' + bosses.dagannothPrime.rank, true);
				}
				if (bosses.dagannothRex.score > 1) {
					kcEmbed.addField(`${rex} Rex‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎`, '**Kills:** ' + bosses.dagannothRex.score + '\n' + '**Rank:** ' + bosses.dagannothRex.rank, true);
				}
				if (bosses.dagannothSupreme.score > 1) {
					kcEmbed.addField(`${supreme} Supreme`, '**Kills:** ' + bosses.dagannothSupreme.score + '\n' + '**Rank:** ' + bosses.dagannothSupreme.rank, true);
				}
				if (bosses.derangedArchaeologist.score > 1) {
					kcEmbed.addField(`${archaeologist} Deranged Archaeologist`, '**Kills:** ' + bosses.derangedArchaeologist.score + '\n' + '**Rank:** ' + bosses.derangedArchaeologist.rank, true);
				}
				if (bosses.generalGraardor.score > 1) {
					kcEmbed.addField(`${bandos} Bandos`, '**Kills:** ' + bosses.generalGraardor.score + '\n' + '**Rank:** ' + bosses.generalGraardor.rank, true);
				}
				if (bosses.giantMole.score > 1) {
					kcEmbed.addField(`${mole} Giant Mole`, '**Kills:** ' + bosses.giantMole.score + '\n' + '**Rank:** ' + bosses.giantMole.rank, true);
				}
				if (bosses.grotesqueGuardians.score > 1) {
					kcEmbed.addField(`${dawn} Guardians`, '**Kills:** ' + bosses.grotesqueGuardians.score + '\n' + '**Rank:** ' + bosses.grotesqueGuardians.rank, true);
				}
				if (bosses.hespori.score > 1) {
					kcEmbed.addField(`${hespori} Hespori`, '**Kills:** ' + bosses.hespori.score + '\n' + '**Rank:** ' + bosses.hespori.rank, true);
				}
				if (bosses.kalphiteQueen.score > 1) {
					kcEmbed.addField(`${kalphite} Kalphite Queen`, '**Kills:** ' + bosses.kalphiteQueen.score + '\n' + '**Rank:** ' + bosses.kalphiteQueen.rank, true);
				}
				if (bosses.kingBlackDragon.score > 1) {
					kcEmbed.addField(`${kbd} King Black Dragon`, '**Kills:** ' + bosses.kingBlackDragon.score + '\n' + '**Rank:** ' + bosses.kingBlackDragon.rank, true);
				}
				if (bosses.kraken.score > 1) {
					kcEmbed.addField(`${kraken} Kraken`, '**Kills:** ' + bosses.kraken.score + '\n' + '**Rank:** ' + bosses.kraken.rank, true);
				}
				if (bosses.kreeArra.score > 1) {
					kcEmbed.addField(`${kree} Armadyl`, '**Kills:** ' + bosses.kreeArra.score + '\n' + '**Rank:** ' + bosses.kreeArra.rank, true);
				}
				if (bosses.krilTsutsaroth.score > 1) {
					kcEmbed.addField(`${kril} Zamorak`, '**Kills:** ' + bosses.krilTsutsaroth.score + '\n' + '**Rank:** ' + bosses.krilTsutsaroth.rank, true);
				}
				if (bosses.mimic.score > 1) {
					kcEmbed.addField(`${mimic} Mimic`, '**Kills:** ' + bosses.mimic.score + '\n' + '**Rank:** ' + bosses.mimic.rank, true);
				}
				if (bosses.nightmare.score > 1) {
					kcEmbed.addField(`${nightmare} Nightmare`, '**Kills:** ' + bosses.nightmare.score + '\n' + '**Rank:** ' + bosses.nightmare.rank, true);
				}
				if (bosses.obor.score > 1) {
					kcEmbed.addField(`${obor} Obor`, '**Kills:** ' + bosses.obor.score + '\n' + '**Rank:** ' + bosses.obor.rank, true);
				}
				if (bosses.sarachnis.score > 1) {
					kcEmbed.addField(`${sarachnis} Sarachnis`, '**Kills:** ' + bosses.sarachnis.score + '\n' + '**Rank:** ' + bosses.sarachnis.rank, true);
				}
				if (bosses.scorpia.score > 1) {
					kcEmbed.addField(`${scorpia} Scorpia`, '**Kills:** ' + bosses.scorpia.score + '\n' + '**Rank:** ' + bosses.scorpia.rank, true);
				}
				if (bosses.skotizo.score > 1) {
					kcEmbed.addField(`${skotizo} Skotizo`, '**Kills:** ' + bosses.skotizo.score + '\n' + '**Rank:** ' + bosses.skotizo.rank, true);
				}
				if (bosses.gauntlet.score > 1) {
					kcEmbed.addField(`${gauntlet} Gauntlet (Normal)`, '**Kills:** ' + bosses.gauntlet.score + '\n' + '**Rank:** ' + bosses.gauntlet.rank, true);
				}
				if (bosses.corruptedGauntlet.score > 1) {
					kcEmbed.addField(`${corrupted} Gauntlet (Corrupted)`, '**Kills:** ' + bosses.corruptedGauntlet.score + '\n' + '**Rank:** ' + bosses.corruptedGauntlet.rank, true);
				}
				if (bosses.theatreOfBlood.score > 1) {
					kcEmbed.addField(`${tob} ToB`, '**Kills:** ' + bosses.theatreOfBlood.score + '\n' + '**Rank:** ' + bosses.theatreOfBlood.rank, true);
				}
				if (bosses.thermonuclearSmokeDevil.score > 1) {
					kcEmbed.addField(`${thermo} Thermo`, '**Kills:** ' + bosses.thermonuclearSmokeDevil.score + '\n' + '**Rank:** ' + bosses.thermonuclearSmokeDevil.rank, true);
				}
				if (bosses.tzKalZuk.score > 1) {
					kcEmbed.addField(`${zuk} Inferno`, '**Kills:** ' + bosses.tzKalZuk.score + '\n' + '**Rank:** ' + bosses.tzKalZuk.rank, true);
				}
				if (bosses.tzTokJad.score > 1) {
					kcEmbed.addField(`${jad} Jad`, '**Kills:** ' + bosses.tzTokJad.score + '\n' + '**Rank:** ' + bosses.tzTokJad.rank, true);
				}
				if (bosses.venenatis.score > 1) {
					kcEmbed.addField(`${venenatis} Venenatis`, '**Kills:** ' + bosses.venenatis.score + '\n' + '**Rank:** ' + bosses.venenatis.rank, true);
				}
				if (bosses.vetion.score > 1) {
					kcEmbed.addField(`${vetion} Vetion`, '**Kills:** ' + bosses.vetion.score + '\n' + '**Rank:** ' + bosses.vetion.rank, true);
				}
				if (bosses.vorkath.score > 1) {
					kcEmbed.addField(`${vorkath} Vorkath`, '**Kills:** ' + bosses.vorkath.score + '\n' + '**Rank:** ' + bosses.vorkath.rank, true);
				}
				if (bosses.zalcano.score > 1) {
					kcEmbed.addField(`${zalcano} Zalcano`, '**Kills:** ' + bosses.zalcano.score + '\n' + '**Rank:** ' + bosses.zalcano.rank, true);
				}
				if (bosses.zulrah.score > 1) {
					kcEmbed.addField(`${zulrah} Zulrah`, '**Kills:** ' + bosses.zulrah.score + '\n' + '**Rank:** ' + bosses.zulrah.rank, true);
				}
				if (stats.main.leaguePoints.score > 1) {
					kcEmbed.addField(`${league} Twisted League`, '**Points:** ' + stats.main.leaguePoints.score + '\n' + '**Rank:** ' + stats.main.leaguePoints.rank, true);
				}
				if (stats.main.bountyHunter.score > 1) {
					kcEmbed.addField(`${pvp} Bounty Hunter`, '**Kills:** ' + bhKills + '\n' + '**Rank:** ' + stats.main.bountyHunter.hunter.rank, true);
				}
				if (stats.main.lastManStanding.score > 1) {
					kcEmbed.addField(`${lms} LMS`, '**Wins:** ' + stats.main.lastManStanding.score + '\n' + '**Rank:** ' + stats.main.lastManStanding.score, true);
				}
				message.channel.send(kcEmbed);
			}
			catch (err) {
				message.channel.send('Sorry, I can\'t help you with that right now.');
				console.log(err);
			}
		})();
	}
});

// Notes for future, when weekly challenge starts, get osrs hiscores for selected boss and add to db, every 4 hrs subtract database kc from new kc to get current score
// Add column for username also.
// Add extra two columns to tables determining start and end kc for bosses to work out scoreboard.
// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(process.env.DISCORD_TOKEN);