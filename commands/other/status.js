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
        let values = await c.shard.broadcastEval(`
        this.shard.id,
        this.guilds.size,
        this.ws.shards > .ping 
        ]
        `);
        let finalString = "**SHARD STATUS**\n\n";
        values.forEach((value) => {
            finalString += "• SHARD: " + value[0] + " | ServerCount: " + value[1] + " | Ping: " + value[2] + "\n";
        });
        message.channel.send(finalString);
        return;
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + e.code + ': [' + e.message + ']\n```'
        )
    }
};