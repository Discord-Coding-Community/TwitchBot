const { CommandoClient } = require('discord.js-commando');
const AutoPoster = require('topgg-autoposter');
const { Structures } = require('discord.js');
const config = require('./TwitchBot/config/config.json');
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
    commandPrefix: config.prefix,
    owner: config.discord_owner_id,
    disableEveryone: true,
    unknownCommandResponse: false
});

const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const app = express();
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzkzMDQzNzk5NzE2NjY1MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1OTg5NjY5fQ.AEcz-EVuU8-IQg2ZnDjhLGzn-w63S_kRfdH_m5hImVU', TwitchBot)

ap.on('posted', () => {
    console.log('Posted stats to Top.gg!')
})

const webhook = new Topgg.Webhook("azd5fg12w2d52cg1");

app.post("/dblwebhook", webhook.middleware(), (req, res) => {

    console.log(req.vote.user);
});

app.listen(27901);

TwitchBot.once('ready', () => {
    console.log(TwitchBot.user.tag + ' ready.');

    TwitchBot.user.setActivity(`with TwitchAPI in ${TwitchBot.guilds.cache.size} servers`)
     const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  TwitchBot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  TwitchBot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
    console.log(TwitchBot.user.tag + ' has started in ' + TwitchBot.guilds.cache.size + ' servers')
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

const guildNames = TwitchBot.guilds.cache.map(g => g.name).join("\n")
const tags = TwitchBot.users.cache.map(u=> `${u.username}#${u.discriminator}`).join(", ");

TwitchBot.on("message", message => {
  if (message.author.bot) return;
  let score;
  if (message.guild) {
    score = TwitchBot.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    }
    TwitchBot.setScore.run(score);
  }
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
});

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

TwitchBot.login(config.token);