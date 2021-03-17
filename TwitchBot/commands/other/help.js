const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h', 'cmds', 'commands'],
            memberName: 'help',
            group: 'other',
            description: "Learn about the bot and it's creator!"
        });
    }

    run(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle('TwitchBot Commands')
            .setDescription('A full list of available commands can be found [here](https://discord-coding-community.github.io/TwitchBot/).')
            .setThumbnail('https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
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