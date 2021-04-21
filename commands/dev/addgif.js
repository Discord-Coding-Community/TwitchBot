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
                config.prefix + 'addgif [Gif URL]'
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
                    prompt: 'What should I add it to?\n\n1. blowjoblinks\n2. boobslinks\n3. hentailinks? Please select a number.',
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
        if (message.channel.nsfw) {
            try {

                let txtFileNumber = txtFileName;

                fs.writeFile('../../resources/nsfw/' + txtFileNumber + '.txt', gifUrl);

                let embed = new MessageEmbed()
                    .setTitle(this.client.user.username)
                    .setDescription('<a: legit_tick: 834269513498492968> New Gif added to ' + txtFileName)
                    .setImage(`${gifUrl}`)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setTimestamp(new Date().toISOString())
                    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.reply(embed);
                return;
            } catch (err) {
                message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                return console.error(err);
            }
        }
    }
};