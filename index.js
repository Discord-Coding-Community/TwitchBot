const { CommandoClient } = require('discord.js-commando');
const AutoPoster = require('topgg-autoposter');
const { Structures } = require('discord.js');
const { prefix, token, discord_owner_id } = require('./TwitchBot/config/config.json');
const path = require('path');
const db = require('quick.db');
const Topgg = require("@top-gg/sdk");
const express = require("express");
const Canvas = require('canvas');


Structures.extend('Guild', function(Guild) {
    class MusicGuild extends Guild {
        constructor(TwitchBot, data) {
            super(TwitchBot, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                songDispatcher: null,
                skipTimer: false, // only skip if user used leave command
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

const TwitchBot = new CommandoClient({
    commandPrefix: prefix,
    owner: discord_owner_id,
    disableEveryone: true,
    unknownCommandResponse: false
});

const ap = AutoPoster(' ', TwitchBot)

ap.on('posted', () => {
    console.log('Posted stats to Top.gg!')
})

const app = express();

const webhook = new Topgg.Webhook(" ");

app.post("/dblwebhook", webhook.middleware(), (req, res) => {

    console.log(req.vote.user);
});

app.listen();

TwitchBot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', ':notes: Music Command Group:'],
        ['gifs', ':film_frames: Gif Command Group:'],
        ['other', ':loud_sound: Other Command Group:'],
        ['guild', ':gear: Guild Related Commands:'],
        ['speedrun', ':athletic_shoe: Speedrun Related Commands:']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        eval: false,
        ping: false,
        prefix: false
    })
    .registerCommandsIn(path.join(__dirname, 'TwitchBot/commands'));

const Guilds = TwitchBot.guilds.cache.map(guild => guild.name);
console.log(Guilds, 'Connected!');
Canvas.registerFont('./TwitchBot/resources/welcome/OpenSans-Light.ttf', {
    family: 'Open Sans Light'
});


TwitchBot.on('voiceStateUpdate', async(___, newState) => {
    if (
        newState.member.user.bot &&
        !newState.channelID &&
        newState.guild.musicData.songDispatcher &&
        newState.member.user.id == TwitchBot.user.id
    ) {
        newState.guild.musicData.queue.length = 0;
        newState.guild.musicData.songDispatcher.end();
        return;
    }
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == TwitchBot.user.id &&
        !newState.selfDeaf
    ) {
        newState.setSelfDeaf(true);
    }
});

TwitchBot.once('ready', () => {
    console.log(TwitchBot.user.tag + ' ready.');

    TwitchBot.user.setActivity(`with TwitchAPI in ${TwitchBot.guilds.cache.size} servers`)
        .then(console.log(`${TwitchBot.user.tag} has started in ${TwitchBot.guilds.cache.size} servers`))
        .catch(err => {
            console.error(err);
        });
});

TwitchBot.login(token);