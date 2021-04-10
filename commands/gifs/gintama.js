const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

if (!config.tenorAPI) return;

module.exports = class GintamaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gintama',
            group: 'gifs',
            memberName: 'gintama',
            description: 'Replies with a gintama gif!',
            examples: [
                config.prefix + 'gintama'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }


    run(message) {
        fetch(
                'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=gintama&limit=1'
            )
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.reply('Failed to fetch a gintama gif :slight_frown:');
                return console.error(e);
            })
    }
};