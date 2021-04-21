const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class BlowjobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blowjob',
            aliases: [
                'blowjob-gif',
                'bjgif'
            ],
            group: 'nsfw',
            memberName: 'blowjob',
            description: 'Generate a random blowjob gif and/or image',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            examples: [
                config.prefix + 'blowjob'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        if (message.channel.nsfw) {
            try {
                const linkArray = fs
                    .readFileSync('././resources/nsfw/blowjoblinks.txt', 'utf8')
                    .split('\n');
                const link = linkArray[Math.floor(Math.random() * linkArray.length)];
                var embed = new MessageEmbed()
                    .setDescription('[Image Link](' + link + ')')
                    .setColor('RANDOM')
                    .setImage(link);
                message.channel.send(embed);
                return;
            } catch (err) {
                message.reply('```css\n [ERROR] Command Error:' + err.code + '(' + err.message + ')\n```');
                return console.error(err);
            }
        }
    }
};