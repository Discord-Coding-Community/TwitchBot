const fs = require('fs');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class BlowjobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blowjob',
            aliases: [
                'blowjob-gif',
                'bjgif',
                'bj'
            ],
            group: 'nsfw',
            memberName: 'blowjob',
            description: 'Generate a random blowjob gif',
            userPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            clientPermissions: [
                'SEND_MESSAGES',
                'EMBED_LINKS'
            ],
            function: search,
            examples: [
                config.prefix + 'blowjob',
                config.prefix + 'blowjob-gif',
                config.prefix + 'bjgif',
                config.prefix + 'bj'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message, { search }) {
        const embed = new MessageEmbed();

        let url = 'https://api.imgur.com/3/gallery/tag_info/hentai_blowjob/?q=' + search[0];

        for (var i = 1; i < search.length; i++) {

            url += '%20' + search[i];

        }

        return fetch(url, {
            headers: {
                'Authorization': 'Client-ID ' + config.imgurClientID
            }
        })

        .then(embed.setImage(res => res.json())
            .then(message.send(embed)))
    }
};