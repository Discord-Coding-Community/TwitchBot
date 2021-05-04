const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class BumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bump',
            aliases: ['upvote'],
            memberName: 'bump',
            group: 'other',
            description: "Vote for TwitchBot on Top.GG"
        });
    }

    run(message) {
        let embed = new MessageEmbed()
            .setTitle('TwitchBot')
            .setDescription('Vote for TwitchBot.\nYou can vote once every 12 hours.')
            .addField('Top.GG', '[Link](https://top.gg/bot/' + config.topgg_client_id + '/vote)', false)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (err) {
        console.error(err)
        message.reply(
            '```css\n[ERROR] Discord API Error: ' + err.code + '(' + err.message + '\n```)'
        )
    }
};