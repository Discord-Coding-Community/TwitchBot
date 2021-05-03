const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = class FurryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'trap',
            aliases: [
                'trap-gif',
                'trapgif'
            ],
            group: 'nsfw',
            memberName: 'trap',
            description: 'Generate a random hentai trap gif and/or image',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            examples: [
                prefix + 'trap'
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
                    .readFileSync('././resources/gifs/nsfw/Trap.txt', 'utf8')
                    .split('\n');
                const link = linkArray[Math.floor(Math.random() * linkArray.length)];
                var embed = new MessageEmbed()
                    .setDescription('[Image Link](' + link + ')')
                    .setColor('RANDOM')
                    .setImage(link);
                message.channel.send(embed);
                return;
            } catch function onError(err) {
                message.channel.send(':x: Something went wrong.... If the problem continues, please contact support.');
                return console.error(err);
            }
        } else {
            return message.channel.send(':x: This command can only be used in NSFW channels...')
        }
    }
};