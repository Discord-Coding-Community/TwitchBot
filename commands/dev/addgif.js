const fs = require('fs');
const { Command } = require('discord.js-commando');
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
            userPermissions: [
                'MANAGE_GUILD',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES'
            ],
            clientPermisiions: [
                'MANAGE_GUILD',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES'
            ],
            args: [{
                    key: 'gifUrl',
                    prompt: 'Which gif would you like to add?',
                    type: 'string'
                },
                {
                    key: 'txtFileName',
                    prompt: 'What should I add it to?\n\nPlease choose one of the following:\n\nblowjoblinks\nboobslinks\nhentailinks\n',
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
        if (message.member.roles.cache.some(r => [
                '801125364252147745',
                '812947164937715712'
            ].includes(r.id))) {
            fs.writeFile('././resources/nsfw/' + txtFileName + '.txt', gifUrl + '\n', { flag: 'a+' }, (err) => {
                if (err) return console.error(err)
                else return message.channel.send('<a:legit_tick:834269513498492968> Successfully added `' + gifUrl + '` to ' + txtFileName + '.')
            })
        } else {
            return message.channel.send('```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + ')\n```').catch(err => {
                console.error(err)
            })
        }
    }
};