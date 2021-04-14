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
        let c = this.client;
        let stats = '**__Shard Status__**\n\n';
        stats += ' • ** Shard **: ' + c.shard.broadcastEval(`[this.shard.id]`) + ' • ** Guilds **: ' + c.shard.broadcastEval(`[this.guilds.size]`) + ' • ** Users **: ' + c.shard.broadcastEval(`[this.users.size]`);
        let embed = new MessageEmbed()
            .setDescription(stats)
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(c.user.username, c.user.displayAvatarURL())
        message.channel.send(embed);
        return;
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + e.code + ': [' + e.message + ']\n```'
        )
    }
};