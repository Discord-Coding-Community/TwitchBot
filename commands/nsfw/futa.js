const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class FutaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'futa',
            aliases: [
                'futa-gif',
                'futagif'
            ],
            group: 'nsfw',
            memberName: 'furry',
            description: 'Generate a random hentai futa gif and/or image',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            examples: [
                config.prefix + 'futa'
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
                    .readFileSync('././resources/gifs/nsfw/Futa.txt', 'utf8')
                    .split('\n');
                const link = linkArray[Math.floor(Math.random() * linkArray.length)];
                var embed = new MessageEmbed()
                    .setDescription('[Image Link](' + link + ')')
                    .setColor('RANDOM')
                    .setImage(link);
                message.channel.send(embed);
                return;
            } catch (err) {
                message.channel.send(':x: Something went wrong.... If the problem continues, please contact support.');
                return console.error(err);
            }
        } else {
            return message.channel.send(':x: This command can only be used in NSFW channels...')
        }
    }
};