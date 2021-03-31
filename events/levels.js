const client = require('discord.js');
require('././database/scores.sqlite');


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
});