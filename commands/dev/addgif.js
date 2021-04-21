const fs = require('fs');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class AddGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addgif',
            aliases: ['add-gif', 'agif'],
            memberName: 'addgif',
            group: 'dev',
            description: 'Adds a gif to the NSFW commands.',
            examples: [
                '`' + config.prefix + 'addgif "https://hentai-gif.gif" "hentai"`'
            ],
            guildOnly: false,
            isOwner: true,
            args: [{
                    key: 'gifUrl',
                    prompt: 'Which gif would you like to add?',
                    type: 'string'
                },
                {
                    key: 'txtFileName',
                    prompt: 'What should I add it to?\n\n1. blowjoblinks\n2. boobslinks\n3. hentailinks\n\nPlease select a number.\n',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    async run(message, { gifUrl, txtFileName }) {
        let txtFileNumber = txtFileName;
        fs.writeFile('../../resources/nsfw/' + txtFileNumber + '.txt', gifUrl, (err) => {
            if (err) return console.error(err)
            else return message.channel.send('Gif added.')
        })
    }
};