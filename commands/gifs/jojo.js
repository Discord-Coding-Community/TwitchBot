const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

// Skips loading if not found in config.json
if (!config.tenorAPI) return;

module.exports = class JojoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'jojo',
            aliases: ['jojo-gif', 'jojo-gifs'],
            group: 'gifs',
            memberName: 'jojo',
            description: 'Replies with a random jojo gif!',
            examples: [
                config.prefix + 'jojo',
                config.prefix + 'jojo-gif',
                config.prefix + 'jojo-gifs'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        fetch(
                'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=jojos-bizarre-adventure&limit=1'
            )
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.reply('Failed to fetch a gif :slight_frown:');
                return console.error(e);
            })
    }
};