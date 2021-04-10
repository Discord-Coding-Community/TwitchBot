const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            group: 'gifs',
            memberName: 'slap',
            description: 'Slap a specified user.',
            examples: [
                config.prefix + 'slap @user#1234'
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
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-slap&limit=1'
                )
                .then(res => res.json())
                .then(json => message.channel.send('**' + message.author.username + '**' + ' slapped ' + '**' + message.mentions.users.first().username + '**' + '\n' + json.results[0].url))
        } else {
            message.channel.send("You have to mention a user")
                .catch(console.error);
                return;
        }
    }
};