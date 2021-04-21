const fetch = require('node-fetch');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

if (!config.tenorAPI) return;

module.exports = class AnimegifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'animegif',
            group: 'gifs',
            aliases: [
                'anime'
            ],
            memberName: 'animegif',
            description: 'Return a random anime gif!',
            examples: [
                '`' + config.prefix + 'animegif`'
            ],
            throttling: {
                usages: 1,
                duration: 4
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
                'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-' + text + '&limit=1'
            )
            .then(res => res.json())
            .then(json => {
                embed.setColor("RANDOM")
                embed.setImage(json.results[0].media[0].gif.url);
                message.channel.send(embed)
            })
            .catch(err => {
                message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                return console.error(err);
            })
    };
};