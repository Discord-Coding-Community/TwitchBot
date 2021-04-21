const fetch = require('node-fetch');
const config = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

if (!config.tenorAPI) return;

module.exports = class patCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            aliases: [
                'animepat',
                'patgif'
            ],
            group: 'gifs',
            memberName: 'pat',
            description: 'Pats a specified user.',
            examples: [
                '`' + config.prefix + 'pat @user#1234'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {
        if (message.mentions.users.first()) {
            const embed = new MessageEmbed();
            fetch(
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-pat&limit=1'
                )
                .then(res => res.json())
                .then(json => {
                    embed.setDescription('**' + message.author.username + '**' + ' pats ' + '**' + message.mentions.users.first().username + '**')
                    embed.setColor("RANDOM")
                    embed.setImage(json.results[0].media[0].gif.url);
                    message.channel.send(embed)
                })
        } else {
            message.channel.send("You have to mention a user")
                .catch(err => {
                    message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                    return console.error(err);
                })
        }
    };
};