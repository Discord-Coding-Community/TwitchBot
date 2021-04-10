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
                'bjgif',
                'bj'
            ],
            group: 'nsfw',
            memberName: 'blowjob',
            description: 'Generate a random blowjob gif',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            examples: [
                config.prefix + 'blowjob',
                config.prefix + 'blowjob-gif',
                config.prefix + 'bjgif',
                config.prefix + 'bj'
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
                .setDescription('Click this link if the image doesn\'t load: [Link](' + link + ')')
                .setColor('RANDOM')
                .setImage(link);
      message.channel.send(embed);                  
      return;
            } catch (e) {
      message.reply('```css\n [ERROR] Dioscord API Error:' + e.code + '(' + e.message + ')\n```');
      return console.error(e);
            }
        }
    }
};