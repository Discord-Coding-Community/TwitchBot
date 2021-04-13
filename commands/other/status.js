const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
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
        let shardStatus = '**__Shard Status__**\n';
        shardStatus += ' • ** Shard **: ' + this.client.shard.broadcastEval(`this.shard.id`) + ' | • ** Guilds **: ' + this.client.shard.broadcastEval(`this.guilds.size`) + ' • | ** Users **: ' + this.client.shard.broadcastEval(`this.users.size`);
        let serverStatus = '**__Server Status__**\n';
        serverStatus += ' • **Online Users**: ' + message.guild.members.cache.filter(member => member.presence.status !== 'offline').size + ' | • **Offline Users**: ' + message.guild.members.cache.filter(member => member.presence.status == 'offline').size + '\n';
        let embed = new MessageEmbed()
            .setDescription(shardStatus + '\n' + serverStatus)
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed);
        return;
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
        )
    }
};