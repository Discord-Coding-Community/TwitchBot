const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [
                'shardstatus',
                'status',
                'shard'
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
        // For each shard, get the shard ID and the number of guilds it owns
        let values = await client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size
    ]
`);
        let finalString = "**SHARD STATUS**\n\n";
        values.forEach((value) => {
            finalString += "• SHARD #" + value[0] + " | ServerCount: " + value[1] + "\n";
        });
        let embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setDescription(finalString)
        message.channel.send(embed).catch(console.error(error));
    }
};