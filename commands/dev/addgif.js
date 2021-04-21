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
                '`' + config.prefix + 'addgif "https://blowjob-gif.gif" "1"`',
                '`' + config.prefix + 'addgif "https://boobs-gif.gif" "2"`',
                '`' + config.prefix + 'addgif "https://hentai-gif.gif" "3"`'
            ],
            guildOnly: false,
            isOwner: true,
            args: [{
                    key: 'url',
                    prompt: 'Which gif would you like to add?',
                    type: 'string'
                },
                {
                    key: 'choice',
                    prompt: 'What should I add it to?\n\n1. Blowjob\n2. Boobs\n3. Hentai\n\nPlease select a number.\n',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    async run(message, { url, choice }) {
        if (message.author.bot) return;
        if (message.channel.nsfw) {

            const { embed1, embed2, embed3 } = new MessageEmbed();

            if (choice.toLowerCase() == '1') choice = 'Blowjob';
            if (choice.toLowerCase() == '2') choice = 'Boobs';
            if (choice.toLowerCase() == '3') choice = 'Hentai';

            if (choice.toLowerCase() == 'Blowjob') {
                fs.writeFile(`././resources/nsfw/blowjoblinks.txt`, 'utf8')
                    .split('\n');
                embed1.setDescription('Successfully added gif to ' + choice)
                embed1.addImage(url)
                embed1.setTimestamp(new Date().toISOString())
                embed1.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.channel.send(embed1)
                    .catch(err => {
                        message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                        return console.error(err);
                    })
            } else if (choice.toLowerCase() == 'Boobs') {
                fs.writeFile(`././resources/nsfw/boobslinks.txt`, 'utf8')
                    .split('\n');
                embed2.setDescription('Successfully added gif to ' + choice)
                embed2.addImage(url)
                embed2.setTimestamp(new Date().toISOString())
                embed2.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.channel.send(embed2)
                    .catch(err => {
                        message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                        return console.error(err);
                    })
            } else if (choice.toLowerCase() == 'Hentai') {
                fs.writeFile(`././resources/nsfw/hentailinks.txt`, 'utf8')
                    .split('\n');
                embed3.setDescription('Successfully added gif to ' + choice)
                embed3.addImage(url)
                embed3.setTimestamp(new Date().toISOString())
                embed3.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.channel.send(embed3)
                    .catch(err => {
                        message.reply('```css\n [ERROR] Discord API Error:' + err.code + '(' + err.message + ')\n```');
                        return console.error(err);
                    })
            };
        }
    }
};