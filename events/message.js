const client = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');
const SQLite = require("better-sqlite3");
const sql = new SQLite('././database/scores.sqlite');

module.exports = {
    name: 'message',
    once: false,
    execute(message) {
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
            if (!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
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
            const embed = new Discord.MessageEmbed()
                .setTitle("Leaderboard")
                .setAuthor(client.user.username, client.user.avatarURL())
                .setDescription("Our top 10 points leaders!")
                .setColor(0x00AE86);
            for (const data of top10) {
                embed.addFields({ name: client.users.cache.get(data.user).tag, value: `${data.points} points (level ${data.level})` });
            }
            return message.channel.send({ embed });
        }
    }
};