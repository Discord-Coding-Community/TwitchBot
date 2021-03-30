const fetch = require('node-fetch');
const { tenorAPI, prefix } = require('../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class patCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            aliases: ['anipat'],
            group: 'gifs',
            memberName: 'pat',
            description: 'Pats a specified user.',
            examples: [`${prefix}pat [@user]`],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        if (message.mentions.users.first()) {
            fetch(
                    `https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime-pat&limit=1`
                )
                .then(res => res.json())
                .then(json => message.channel.send('**' + message.author.username + '**' + ' pats ' + '**' + message.mentions.users.first().username + '**' + '\n' + json.results[0].url))
        } else {
            message.channel.send("You have to mention a user to pat").catch(function onError(err) {
                message.reply('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```');
                return;
            })
        }
    }
};