const fetch = require('node-fetch');
const { tenorAPI } = require('../../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class BakaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'baka',
            aliases: ['anibaka'],
            group: 'gifs',
            memberName: 'baka',
            description: 'Call a specified user baka!',
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
              if (message.mentions.users.first()) {
        fetch(
                `https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime-baka&limit=1`
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
