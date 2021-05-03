const fetch = require('node-fetch');
const config = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

if (!config.tenorAPI) return;

module.exports = class GifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search-gif',
            group: 'gifs',
            aliases: ['sgif', 'search-gifs'],
            memberName: 'search-gif',
            description: 'Provide a query and replies with a gif!',
            examples: [
                '`' + config.prefix + 'search-gif puppy'
            ],
            throttling: {
                usages: 2,
                duration: 8
            },
            args: [{
                key: 'text',
                prompt: 'What gif would you like to post?',
                type: 'string',
                validate: function validateText(text) {
                    return text.length < 50;
                }
            }]
        });
    }

    run(message, { text }) {
        const embed = new MessageEmbed();
        fetch(
                'https://g.tenor.com/v1/random?key=' + config.tenorAPI + '&q=' + text + '&limit=1'
            )
            .then(res => res.json())
            .then(json => {
                embed.setColor("RANDOM")
                embed.setImage(json.results[0].media[0].gif.url);
                message.channel.send(embed)
            })
            .catch(function onError(err) {
                message.channel.send(':x: Something went wrong.... If the problem continues, please contact support.');
                return console.error(err);
            })
    }
};