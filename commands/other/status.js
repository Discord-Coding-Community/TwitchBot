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
                'stats',
                'si',
                'shards'
            ],
            memberName: 'status',
            group: 'other',
            description: "Displays the bot's status.",
            examples: [
                config.prefix + 'status'
            ],
            userPermissions: ['SEND_MESSAGES'],
            clientPermission: ['SEND_MESSAGES']
        });
    }

    async run(message) {
        let stats = '**__Shard Status__**\n\n';
        stats += ' • ** Shard**: ' + this.client.shard.broadcastEval(this.client.shard.id) + ' | **Guilds**: ' + this.client.shard.broadcastEval(this.client.shard.guilds.size) + ' | ** Users **: ' + this.client.shard.broadcastEval(this.client.shard.user.size);
        let embed = new MessageEmbed()
            .setDescription(stats)
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed);
        return;
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + e.code + ': [' + e.message + ']\n```'
        )
    }
};