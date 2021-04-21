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
            description: 'Adds a Gif to the Gif commands.',
            examples: [
                '`' + config.prefix + 'addgif https://hentai-gif.gif NSFW Hentai"`',
                '`' + config.prefix + 'addgif https://jojo-gif.gif SFW Jojo"`'
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
                    key: 'Link',
                    prompt: 'Which gif would you like to add?',
                    type: 'string'
                },
                {
                    key: 'Type',
                    prompt: 'Is the gif SFW or NSFW?',
                    type: 'string'
                },
                {
                    key: 'File',
                    prompt: 'Please select a file name from the list below:\n\n**__SFW__**\n\nAnime\nBaka\nGintama\nJojo\nSlap\n\nHug\nKiss\n\n**__NSFW__**\n\nBlowjob\nBoobs\nHentai\nFurry\nFuta\nTrap\n',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    async run(message, { Link, Type, File }) {
        if (message.channel.nsfw) {
            if (message.member.roles.cache.some(r => [
                    '834453807056289794',
                    '812947164937715712'
                ].includes(r.id))) {

                fs.writeFile('././resources/gifs/' + Type + '/' + File + '.txt', Link + '\n', { flag: 'a+' }, (err) => {
                    if (err) return console.error(err)
                    else return message.channel.send('<a:legit_tick:834269513498492968> Successfully added `' + Link + '` to ' + File + '.')
                })
            } else {
                return message.channel.send(':x: This command can only be used by my Developers...').catch(err => {
                    console.error(err)
                })
            }
        } else {
            return message.channel.send(':x: This command can only be used in NSFW channels...')
        }
    }
};