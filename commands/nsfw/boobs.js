const fs = require('fs');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            aliases: [
                'boob-gif',
                'bbgif'
            ],
            group: 'nsfw',
            memberName: 'boobs',
            description: 'Generate a random boobs gif',
            userPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            examples: [
                config.prefix + 'boobs',
                config.prefix + 'boob-gif',
                config.prefix + 'bbgif'
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
        .readFileSync('././resources/nsfw/boobslinks.txt', 'utf8')
        .split('\n');
      const link = linkArray[Math.floor(Math.random() * linkArray.length)];
      message.channel.send(link);
      return;
            } catch (e) {
      message.reply('```css\n [ERROR] Dioscord API Error:' + e.code + '(' + e.message + ')\n```');
      return console.error(e);
            }
        }
    }
};