const { CommandoClient } = require('discord.js-commando');
const Discord = require("discord.js");
const AutoPoster = require('topgg-autoposter');
const { Structures } = require('discord.js');
const config = require('./TwitchBot/config/config.json');
const path = require('path');
const db = require('quick.db');
const Topgg = require("@top-gg/sdk");
const Canvas = require('canvas');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

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
    owner: config.discord_owner_id
});

const ap = AutoPoster(config.ap_api, TwitchBot)

ap.on('posted', () => {
    console.log('Posted stats to Top.gg!')
})

TwitchBot.once('ready', () => {
    console.log(TwitchBot.user.tag + ' ready.');

    TwitchBot.user.setActivity(`${config.prefix}help`)
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
    
    if(command === "points") {
  return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
}
    
    if(command === "give") {
  // Limited to guild owner - adjust to your own preference!
  if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");

  const user = message.mentions.users.first() || TwitchBot.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");

  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

  // Get their current points.
  let userscore = TwitchBot.getScore.get(user.id, message.guild.id);
  // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
  if (!userscore) {
    userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
  }
  userscore.points += pointsToAdd;

  // We also want to update their level (but we won't notify them if it changes)
  let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  userscore.level = userLevel;

  // And we save it!
  TwitchBot.setScore.run(userscore);

  return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
}

if(command === "leaderboard") {
  const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setAuthor(TwitchBot.user.username, TwitchBot.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);

  for(const data of top10) {
    embed.addField(TwitchBot.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }
  return message.channel.send({embed});
}

  
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
    prefix: false,
    unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, 'TwitchBot/commands'));

const Guilds = TwitchBot.guilds.cache.map(guild => guild.name);
console.log(Guilds, 'Connected!');
Canvas.registerFont('./TwitchBot/resources/welcome/OpenSans-Light.ttf', {
    family: 'Open Sans Light'
});

TwitchBot.on("error", function(error){
    console.error(`error: ${error}`);
});

TwitchBot.on("warn", function(info){
    console.log(`warn: ${info}`);
});

TwitchBot.on("debug", function(info){
    console.log(`debug -> ${info}`);
});


TwitchBot.login(config.token);