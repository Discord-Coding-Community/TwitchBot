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
                    key: 'arg1',
                    prompt: 'Which gif would you like to add?',
                    type: 'string'
                },
                {
                    key: 'arg2',
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

    async run(message, { arg1, arg2 }) {
        if (message.channel.nsfw) {
            try {

                fs.writeFile('../../resources/nsfw/' + arg2 + '.txt', arg1, function(err) {

                    if (err) return console.log(err);
                });

                let embed = new MessageEmbed()
                    .setTitle(this.client.user.username)
                    .setDescription('New Gif added to ' + arg2)
                    .setImage(`${arg1}`)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setTimestamp(new Date().toISOString())
                    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.reply(embed);
                return;
            } catch (err) {
                message.reply('```css\n [ERROR] Discord API Error: ' + err.code + ': (' + err.message + ')\n```');
                return console.error(err);
            }
        }
    }
};