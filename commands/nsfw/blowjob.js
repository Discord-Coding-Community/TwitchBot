// const fetch = require('node-fetch');
// const { tenorAPI, prefix } = require('../../config.json');
const prefix = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');

module.exports = class BlowjobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blowjob',
            aliases: ['blowjob-gif', 'bjgif'],
            group: 'nsfw',
            memberName: 'blowjob',
            description: 'Generate a random blowjob gif',
            userPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            examples: [`${prefix}blowjob`],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        
              /*
      I changed the command from calling the tenor api each time someone
      uses the t!blowjob command for the following reason:
      
      1. The tenor api doesn't seem to work with nsfw gifs
      */

      /*
       if (message.channel.nsfw) {            
            fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=nsfw-blowjobs&limit=1`)
                .then(res => res.json())
                .then(json => message.channel.send(json.results[0].url)
        } else {
            message.channel.send("This command must be used in an NSFW channel.").catch(function onError(err) {
                message.reply('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```');
                return;
            })
        }
    }
};
      */
        
        if (message.channel.nsfw) {            
            try {
      const linkArray = fs
        .readFileSync('././resources/gifs/blowjoblinks.txt', 'utf8')
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