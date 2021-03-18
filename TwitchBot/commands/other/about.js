const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class WhoMadeMeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: ['botinfo', 'whomademe', 'bot-maker', 'bot-creator'],
            memberName: 'about',
            group: 'other',
            description: "Learn about the bot and it's creator!"
        });
    }

    run(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle('About TwitchBot')
            .addField('Owners', 'Nimbi#4961, MountainTiger#2567', false)
            .addField('Status',
                '[UptimeRobot](https://stats.uptimerobot.com/Zrzj8fMr5g)', true)
            .addField('GitHub', '[Discord-Coding-Community / TwitchBot](https://github.com/discord-coding-community/twitchbot)', true)
            .setThumbnail('https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
            .setImage('https://camo.githubusercontent.com/5d5b193d7bbf1bf15bc28971214faff2f967d0d6d6812683ee94b96fcf25dda2/68747470733a2f2f7777772e7475626566696c7465722e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031352f31322f5477697463682d436f2d53747265616d2d47616d652d4177617264732d506c617953746174696f6e2d457870657269656e63652d323031352e6a7067')
            .setTimestamp(new Date().toISOString())
            .setFooter('TwitchBot', 'https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        message.channel.send(embed)
            .then(console.log())
            .catch(err => {
                console.error(err);
                message.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
            })
    }
};