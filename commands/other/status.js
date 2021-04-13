const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [
                'shard-status',
                'shard-info',
                'si',
                'ss'
            ],
            memberName: 'status',
            group: 'other',
            description: "Displays the shard status.",
            examples: [
                config.prefix + 'status'
            ]
        });
    }

    run(message) {
        let s = this.client.shard;
        let embed = new MessageEmbed()
            .setDescription('**__Shard Status__**')
            .addField('Total Users', `${s.fetchClientValues('users.cache.size')}`, true)
            .addField('Total Channels', `${s.fetchClientValues('channels.cache.size')}`, true)
            .addField('Total Guilds', `${s.fetchClientValues('guilds.cache.size')}`, true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
        )
    }
};