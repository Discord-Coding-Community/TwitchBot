const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const SQLite = require("better-sqlite3");
const sql = new SQLite('././database/scores.sqlite');
require('../../events/levels.js')

module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: ['leaders', 'top', 'top10', 'point-leaders'],
            group: 'guild',
            memberName: 'leaderboard',
            description: "Displays the guild's top 10 points leaders.",
            examples: [`${config.prefix}leaderboard`],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            guildOnly: true,
        });
    }

    async run(message) {
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
};