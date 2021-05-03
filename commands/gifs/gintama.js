const fetch = require('node-fetch');
const { tenorAPI, prefix } = require('../../config.json');
const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

if (!tenorAPI) return;

module.exports = class GintamaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gintama',
            group: 'gifs',
            memberName: 'gintama',
            description: 'Replies with a gintama gif!',
            examples: [
                '`' + prefix + 'gintama'
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
                'https://g.tenor.com/v1/random?key=' + tenorAPI + '&q=gintama&limit=1'
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