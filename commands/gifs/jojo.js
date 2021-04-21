const fetch = require('node-fetch');
const config = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

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
                '`' + config.prefix + 'jojo'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        const embed = new MessageEmbed();
        fetch(
                'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=jojos-bizarre-adventure&limit=1'
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
    }
};