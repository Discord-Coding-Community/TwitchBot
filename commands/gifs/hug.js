const fetch = require('node-fetch');
const config = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

if (!config.tenorAPI) return;

module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'gifs',
            memberName: 'hug',
            description: 'Hug a specified user.',
            examples: [
                config.prefix + 'hug @user#1234'
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
                    'https://api.tenor.com/v1/random?key=' + config.tenorAPI + '&q=anime-hug&limit=1'
                )
                .then(res => res.json())
            .then(json => {
            embed.setDescription('**' + message.author.username + '**' + ' hugged ' + '**' + message.mentions.users.first().username + '**')    
            embed.setColor("RANDOM")
            embed.setImage(json.results[0].media[0].gif.url);
            message.channel.send(embed)
        })
        } else {
            message.channel.send("You have to mention a user")
                .catch(e => {
                message.channel.send('Failed to fetch a gif')
            .console.error(e);
            return;
              })
        }
    };
};