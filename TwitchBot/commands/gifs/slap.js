const fetch = require('node-fetch');
const { tenorAPI } = require('../../../TwitchBot/config/config.json');
const { Command } = require('discord.js-commando');

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: ['anismack', 'anislap', 'smack'],
            group: 'gifs',
            memberName: 'slap',
            description: 'Replies with a random anime slap gif!',
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        if (message.mentions.users.first()) {
        fetch(
                `https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime-slap&limit=1`
            )
            .then(res => res.json())
            .then(json => message.channel.send('**' + message.author.username + '**' + ' has slapped ' + '**' + message.mentions.users.first().username + '**' + '\n' + json.results[0].url))
        } else {
            message.channel.send("You have to mention a user to slap").catch(function onError(err) {
                message.reply('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```');
                return;
            })
        }
    }
};