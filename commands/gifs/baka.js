const fetch = require('node-fetch');
const config = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');

if (!config.tenorAPI) return;


module.exports = class BakaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'baka',
            aliases: ['anibaka'],
            group: 'gifs',
            memberName: 'baka',
            description: 'Call a specified user baka!',
            examples: [
                config.prefix + 'baka @user#1234',
                config.prefix + 'anibaka @user#1234'
                      ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
          if (message.mentions.users.first()) {
              
              const baka_list = fs.readFileSync('././resources/gifs/baka_answers.json', 'utf8');
              const baka_Array = JSON.parse(baka_list).answers;
              const baka_answers =
                    baka_Array[Math.floor(Math.random() * baka_Array.length)];
              fetch(
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-baka&limit=1'
                )
                  .then(res => res.json())
                  .then(json => message.channel.send('**' + message.mentions.users.first().username + '** made ' + '**' + message.author.username + '**' + ' ' + baka_answers.text + '... baka!\n' + json.results[0].url))
          } else {
              message.channel.send("You have to mention a user")
                  .catch(console.error);
              return;
          }
    }
};