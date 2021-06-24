const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const fetch = require("node-fetch");
const AutoPoster = require('topgg-autoposter');
const db = require('quick.db');
const Canvas = require('canvas');
const { 
    prefix, 
    apAPI, 
    twitch_url, 
    discord_owner_id,
    clientTOKEN
} = require('./config.json');

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
        ['twitchbot', '**TwitchBot Commands**:']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval: false,
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


    console.log(`Connecting to ${client.guilds.cache.size} servers...`);
    setInterval(() => {
        const index_1 = Math.floor(Math.random() * (list_1.length - 1) + 1);
        const index_2 = Math.floor(Math.random() * (list_2.length - 1) + 1);
        client.user.setActivity(list_1[index_1], {
            type: list_2[index_2],
            url: twitch_url
        });
    }, 10000);


    console.log(`${client.user.tag} connected to ${client.guilds.cache.size} servers!`);

    const ap = AutoPoster(apAPI, client)

    ap.on('posted', () => {

        console.log('Posted stats to Top.gg!');
    })
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