const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const config = require('./config.json');
const db = require('quick.db');
const Canvas = require('canvas');
const AutoPoster = require('topgg-autoposter');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./database/scores.sqlite');


Structures.extend('Guild', function(Guild) {
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                songDispatcher: null,
                skipTimer: false,
                loopSong: false,
                loopQueue: false,
                volume: 1
            };
            this.triviaData = {
                isTriviaRunning: false,
                wasTriviaEndCalled: false,
                triviaQueue: [],
                triviaScore: new Map()
            };
        }
        resetMusicDataOnError() {
            this.musicData.queue.length = 0;
            this.musicData.isPlaying = false;
            this.musicData.nowPlaying = null;
            this.musicData.loopSong = false;
            this.musicData.loopQueue = false;
            this.musicData.songDispatcher = null;
        }
    }
    return MusicGuild;
});

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.discord_owner_id
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', 'Music Commands'],
        ['gifs', 'Gif Commands'],
        ['other', 'Other Commands'],
        ['guild', 'Guild Commands'],
        ['speedrun', 'Speedrun Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval: false,
        prefix: false,
        ping: false,
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {


    const list_1 = [
        `${config.prefix}help`,
        `${client.users.cache.size} users`,
        `${client.channels.cache.size} channels`,
        `${client.guilds.cache.size} servers`
    ];


    const list_2 = [
        'STREAMING',
        'WATCHING',
        'LISTENING',
        'PLAYING'
    ];


    console.log(client.user.tag + ' is ready in ' + client.guilds.cache.size + ' servers!');
    setInterval(() => {
        const index_1 = Math.floor(Math.random() * (list_1.length - 1) + 1);
        const index_2 = Math.floor(Math.random() * (list_2.length - 1) + 1);
        client.user.setActivity(list_1[index_1], {
            type: list_2[index_2],
            url: config.twitch_url
        });
    }, 10000);


    const Guilds = client.guilds.cache.map(guild => guild.name);

    console.log(Guilds, 'Connected!');
    Canvas.registerFont('./resources/welcome/OpenSans-Light.ttf', {
        family: 'Open Sans Light'
    });

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();

    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();

        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");

    const ap = AutoPoster(config.ap_api, client)

    ap.on('posted', () => {
        console.log('Posted stats to Top.gg!')
    })

});

client.on('guildMemberAdd', async member => {

    const serverSettingsFetch = db.get(member.guild.id);
    if (!serverSettingsFetch || serverSettingsFetch == null) return;

    const welcomeMsgSettings = serverSettingsFetch.serverSettings.welcomeMsg;
    if (welcomeMsgSettings == undefined) return;

    if (welcomeMsgSettings.status == 'no') return;

    if (welcomeMsgSettings.status == 'yes') {
        var applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
            let fontSize = 70;

            do {
                ctx.font = `${(fontSize -= 10)}px Open Sans Light`;
            } while (ctx.measureText(text).width > canvas.width - 300);

            return ctx.font;
        };


        var canvas = await Canvas.createCanvas(
            welcomeMsgSettings.imageWidth,
            welcomeMsgSettings.imageHeight
        );


        var ctx = canvas.getContext('2d');


        var background = await Canvas.loadImage(welcomeMsgSettings.wallpaperURL);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);


        if (welcomeMsgSettings.topImageText == 'default') {
            ctx.font = '26px Open Sans Light';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(
                `Welcome to ${member.guild.name}`,
                canvas.width / 2.5,
                canvas.height / 3.5
            );

            ctx.strokeStyle = `#FFFFFF`;
            ctx.strokeText(
                `Welcome to ${member.guild.name}`,
                canvas.width / 2.5,
                canvas.height / 3.5
            );

        } else {

            ctx.font = '26px Open Sans Light';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(
                welcomeMsgSettings.topImageText,
                canvas.width / 2.5,
                canvas.height / 3.5
            );

            ctx.strokeStyle = `#FFFFFF`;
            ctx.strokeText(
                welcomeMsgSettings.topImageText,
                canvas.width / 2.5,
                canvas.height / 3.5
            );
        }


        if (welcomeMsgSettings.bottomImageText == 'default') {
            ctx.font = applyText(canvas, `${member.displayName}!`);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(
                `${member.displayName}!`,
                canvas.width / 2.5,
                canvas.height / 1.8
            );
            ctx.strokeStyle = `#FF0000`;
            ctx.strokeText(
                `${member.displayName}!`,
                canvas.width / 2.5,
                canvas.height / 1.8
            );
        } else {
            //Lower Text Options DB
            ctx.font = applyText(canvas, `${member.displayName}!`);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(
                welcomeMsgSettings.bottomImageText,
                canvas.width / 2.5,
                canvas.height / 1.8
            );
            ctx.strokeStyle = `#FF0000`;
            ctx.strokeText(
                welcomeMsgSettings.bottomImageText,
                canvas.width / 2.5,
                canvas.height / 1.8
            );
        }


        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                format: 'jpg'
            })
        );


        ctx.drawImage(avatar, 25, 25, 200, 200);


        const attachment = new MessageAttachment(
            canvas.toBuffer(),
            'welcome-image.png'
        );


        var embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .attachFiles(attachment)
            .setImage('attachment://welcome-image.png')
            .setFooter(`Type help for a feature list!`)
            .setTimestamp();
        if (welcomeMsgSettings.embedTitle == 'default') {
            embed.setTitle(
                `:speech_balloon: Hey ${member.displayName}, You look new to ${member.guild.name}!`
            );
        } else embed.setTitle(welcomeMsgSettings.embedTitle);


        if (
            welcomeMsgSettings.destination == 'direct message' ||
            !welcomeMsgSettings.destination
        )
            try {
                await member.user.send(embed);
            } catch {
                console.log(`${member.user.username}'s dms are private`);
            }


        if (welcomeMsgSettings.destination != 'direct message') {
            const channel = member.guild.channels.cache.find(
                channel => channel.name === welcomeMsgSettings.destination
            );
            await channel.send(`${member}`);
            await channel.send(embed);
        }
    }
});


client.on('voiceStateUpdate', async(___, newState) => {
    if (
        newState.member.user.bot &&
        !newState.channelID &&
        newState.guild.musicData.songDispatcher &&
        newState.member.user.id == client.user.id
    ) {
        newState.guild.musicData.queue.length = 0;
        newState.guild.musicData.songDispatcher.end();
        return;
    }
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
    ) {
        newState.setSelfDeaf(true);
    }
});

client.on("message", message => {
    if (message.author.bot) return;
    let score;
    if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
            score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
        }
        score.points++;
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if (score.level < curLevel) {
            score.level++;
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
        client.setScore.run(score);
    }
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "points") {
        return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
    }
    if (command === "give") {

        if (!message.author.id === message.guild.owner) return message.reply("You can't do that!");
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.reply("You must mention someone or give their ID!");
        const pointsToAdd = parseInt(args[1], 10);
        if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
        let userscore = client.getScore.get(user.id, message.guild.id);
        if (!userscore) {
            userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
        }
        userscore.points += pointsToAdd;
        let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
        userscore.level = userLevel;
        client.setScore.run(userscore);
        return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
    }
    if (command === "leaderboard") {
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
        const embed = new MessageEmbed()
            .setTitle("Leaderboard")
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription("Our top 10 points leaders!")
            .setColor('RANDOM');
        for (const data of top10) {
            embed.addField(client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
        }
        return message.channel.send({ embed });
    }
});



client.login(config.token);