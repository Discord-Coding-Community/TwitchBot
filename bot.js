const { CommandoClient } = require('discord.js-commando');
const Structures = require('discord.js');
const path = require('path');
const config = require('./config.json');
const db = require('quick.db');
const Canvas = require('canvas');
const AutoPoster = require('topgg-autoposter');
const Topgg = require("@top-gg/sdk");


Structures.extend('Guild', function(Guild) {
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);
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

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.discord_owner_id
});

client.registry
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
        eval: false,
        prefix: false,
        commandState: false,
        help: false,
        unknownCommandResponse: false,
        disableEveryone: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

const ap = AutoPoster(config.ap_api, TwitchBot)

ap.on('posted', () => {
    console.log('Posted stats to Top.gg!')
})


client.login(config.token);