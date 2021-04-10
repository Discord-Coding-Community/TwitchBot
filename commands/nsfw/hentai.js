const fs = require('fs');
const { Command } = require('discord.js-commando');
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
            description: 'Generate a random hentai gif',
            userPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            examples: [
                config.prefix + 'hentai',
                config.prefig + 'hentai-gif',
                config.prefix + 'hgif'
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
      message.channel.send(link);
      return;
            } catch (e) {
      message.reply('```css\n [ERROR] Dioscord API Error:' + e.code + '(' + e.message + ')\n```');
      return console.error(e);
            }
        }
    }
};