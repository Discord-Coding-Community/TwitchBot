const fs = require('fs');
const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class AddGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addgif',
            aliases: ['add-gif', 'agif'],
            memberName: 'addgif',
            group: 'dev',
            description: 'Adds a Gif to the Gif commands.',
            examples: [
                '`' + prefix + 'addgif nsfw Hentai https://hentai-gif.gif"`',
                '`' + prefix + 'addgif sfw Jojo https://jojo-gif.gif"`'
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
                key: 'TYPE',
                prompt: 'Is the gif SFW or NSFW?',
                type: 'string'
            },
            {
                key: 'FILE',
                prompt: 'Please select a File Name from the list below:\n\n**__SFW__**\n\nAnime\nBaka\nGintama\nJojo\nSlap\n\nHug\nKiss\n\n**__NSFW__**\n\nBlowjob\nBoobs\nHentai\nFurry\nFuta\nTrap\n',
                type: 'string'
            },
            {
                key: 'URL',
                prompt: 'Which gif would you like to add?',
                type: 'string'
            }
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    async run(message, { TYPE, FILE, URL }) {
        if (message.member.roles.cache.some(r => [
            '834453807056289794',
            '812947164937715712'
        ].includes(r.id))) {

            fs.writeTxtFILE('././resources/gifs/' + TYPE + '/' + PATH + '.txt', URL + '\n', { flag: 'a+' }, (err) => {
                if (err) return message.reply(```css\n[ERROR] Discord API Error: ${err.code}: ${err.message}\n```)
                    .console.error(err)
                else return message.channel.send('<a:legit_tick:834269513498492968> Successfully added `' + URL + '` to `../../resources/gifs/' + TYPE + '/' + FILE + '/.txt`')
            })
        }
    }
};