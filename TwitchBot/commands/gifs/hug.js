const fetch = require('node-fetch');
const { tenorAPI } = require('../../../TwitchBot/config/config.json');
const { Command } = require('discord.js-commando');

module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            aliases: ['anihug'],
            group: 'gifs',
            memberName: 'hug',
            description: 'Replies with a random anime hug gif!',
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        fetch(
                `https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime-hug&limit=1`
            )
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.reply('Failed to fetch a gif :slight_frown:');
                return console.error(e);
            })
    }
};