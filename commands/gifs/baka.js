const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

// Skips loading if not found in config.json
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
            fetch(
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + 'q=anime-baka&limit=1'
                )
                .then(res => res.json())
                .then(json => message.channel.send('**' + message.author.username + '**' + ' called ' + '**' + message.mentions.users.first().username + '**' + 'baka! What did ' + message.mentions.users.first().username + ' do to recieve such a harsh reaction?\n' + json.results[0].url))
        } else {
            message.channel.send("You have to mention a user to slap").catch(function onError(err) {
                message.reply('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```');
                return;
            })
        }
    }
};