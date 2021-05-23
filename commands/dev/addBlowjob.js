const fs = require('fs');
const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class AddGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addBlowjob',
            memberName: 'addBlowjob',
            group: 'dev',
            description: 'Adds a Blowjob Gif.',
            examples: [
                '`' + prefix + 'addgif https://Blowjob-gif.gif"`'
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
            args: [
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

    async run(message, { URL }) {
        if (message.member.roles.cache.some(r => [
            '834453807056289794',
            '812947164937715712'
        ].includes(r.id))) {

            fs.writeFILE('././resources/gifs/nsfw/Blowjob.txt', URL + '\n', { flag: 'a+' }, (err) => {
                if (err) return message.reply(```css\n[ERROR] Discord API Error: ${err.code}: ${err.message}\n```)
                    .console.error(err)
                else return message.channel.send('<a:legit_tick:834269513498492968> Successfully added `' + URL + '`././resources/gifs/nsfw/Blowjob.txt`')
            })
        }
    }
};