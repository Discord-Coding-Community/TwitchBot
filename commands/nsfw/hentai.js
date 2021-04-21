const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentai',
            aliases: [
                'hentai-gif',
                'hgif'
            ],
            group: 'nsfw',
            memberName: 'hentai',
            description: 'Generate a random hentai gif and/or image',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            examples: [
                '`' + config.prefix + 'hentai`'
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
                    .readFileSync('././resources/nsfw/hentailinks.txt', 'utf8')
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