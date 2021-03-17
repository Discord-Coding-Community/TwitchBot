const fetch = require('node-fetch');
const { tenorAPI } = require('../../../TwitchBot/config/config.json');
const { Command } = require('discord.js-commando');

module.exports = class patCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            aliases: ['anipat'],
            group: 'gifs',
            memberName: 'pat',
            description: 'Replies with a random anime pat gif!',
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        fetch(
                `https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime-pat&limit=1`
            )
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.reply('Failed to fetch a gif :slight_frown:');
                return console.error(e);
            })
    }
};