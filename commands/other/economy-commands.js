const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class EconomyCommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'economy-commands',
            aliases: ['lvl-cmds', 'economey-help', 'lvl-help'],
            memberName: 'economy-commands',
            group: 'other',
            description: "Display's the economy commands."
        });
    }

    run(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Economy Commands')
            .addField(`${config.prefix}Leaderboard`, 'Displays the guild\'s top 10 points leaders.', false)
            .addField(`${config.prefix}Points`, 'Display\'s the users points.', false)
            .addField(`${config.prefix}Give [@user] [number]`, 'Give a tagged user some pints. *(Guild Onwer Command)*', false)
            .setThumbnail('https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
            .setImage('https://camo.githubusercontent.com/5d5b193d7bbf1bf15bc28971214faff2f967d0d6d6812683ee94b96fcf25dda2/68747470733a2f2f7777772e7475626566696c7465722e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031352f31322f5477697463682d436f2d53747265616d2d47616d652d4177617264732d506c617953746174696f6e2d457870657269656e63652d323031352e6a7067')
            .setTimestamp(new Date().toISOString())
            .setFooter('TwitchBot', 'https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        message.channel.send(embed)
            .then(console.log(console.error));
    }
};