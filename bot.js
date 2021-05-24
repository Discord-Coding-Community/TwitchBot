const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const fetch = require("node-fetch");
const AutoPoster = require('topgg-autoposter');
const db = require('quick.db');
const Canvas = require('canvas');
const { prefix, apAPI, twitch_url, discord_owner_id, clientTOKEN } = require('./config.json');

Structures.extend('Guild', function (Guild) {
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
    commandPrefix: prefix,
    owner: discord_owner_id
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', ':notes: **Music Command Group**:'],
        ['gifs', ':film_frames: **Gif Command Group**:'],
        ['nsfw', ':underage: **NSFW Command Group**:'],
        ['other', ':loud_sound: **Other Command Group**:'],
        ['guild', ':gear: **Guild Related Commands**:'],
        ['speedrun', ':athletic_shoe: **Speedrun Related Commands**:']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval: false,
        ping: false,
        help: false,
        unknownCommandResponse: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {


    const guildCacheMap = client.guilds.cache;
    const guildCacheArray = Array.from(guildCacheMap, ([name, value]) => ({
        name,
        value
    }));
    let memberCount = 0;
    for (let i = 0; i < guildCacheArray.length; i++) {
        memberCount = memberCount + guildCacheArray[i].value.memberCount;
    }


    const list_1 = [
        prefix + `help | ${memberCount} users`,
        prefix + `help | ${client.channels.cache.size} channels`,
        prefix + `help | ${client.guilds.cache.size} servers`
    ];

    const list_2 = [
        'STREAMING',
        'WATCHING',
        'LISTENING'
    ];


    console.log('Connecting to ' + client.guilds.cache.size + ' servers...');
    setInterval(() => {
        const index_1 = Math.floor(Math.random() * (list_1.length - 1) + 1);
        const index_2 = Math.floor(Math.random() * (list_2.length - 1) + 1);
        client.user.setActivity(list_1[index_1], {
            type: list_2[index_2],
            url: twitch_url
        });
    }, 10000);


    console.log(client.user.tag + ' connected to ' + client.guilds.cache.size + ' servers!');
    Canvas.registerFont('./resources/welcome/OpenSans-Light.ttf', {
        family: 'Open Sans Light'
    });

    const ap = AutoPoster(apAPI, client)

    ap.on('posted', () => {

        console.log('Posted stats to Top.gg!');
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


client.on('voiceStateUpdate', async (___, newState) => {
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

client.on('shardError', error => {
    try { } catch (e) {
        let(e) = error;
        if ((e) instanceof shardError) Error.captureStackTrace(e);
        console.error('[ERROR] A web socket has encountered an error:', (e));
    }
});

client.on('unhandledRejection', error => {
    try { } catch (e) {
        let(e) = error;
        if ((e) instanceof unhandledRejection) Error.captureStackTrace(e);
        console.error('[ERROR] unhandledRejection:' + client.message.guild.name + '(' + client.message.guild.id + ')][#' + client.message.channel.name + ']', (e));
    }
});

client.on('DiscordAPIError', error => {
    try { } catch (e) {
        let(e) = error;
        if ((e) instanceof DiscordAPIError) Error.captureStackTrace(e);
        console.error('[ERROR] DiscordAPIError:' + client.message.guild.name + '(' + client.message.guild.id + ')][#' + client.message.channel.name + ']', (e));
    }
});

client.login(clientTOKEN);