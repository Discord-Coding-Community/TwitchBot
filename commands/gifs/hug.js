const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

// Skips loading if not found in config.json
if (!config.tenorAPI) return;

module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'gifs',
            memberName: 'hug',
            description: 'Hug a specified user.',
            examples: [
                config.prefix + 'hug @user#1234'
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
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-hug&limit=1'
                )
                .then(res => res.json())
                .then(json => message.channel.send('**' + message.author.username + '**' + ' hugged ' + '**' + message.mentions.users.first().username + '**' + '\n' + json.results[0].url))
        } else {
            message.channel.send("You have to mention a user to hug").catch(function onError(err) {
                message.reply('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```');
                return;
            })
        }
    }
};