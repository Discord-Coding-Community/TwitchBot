const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = class NewsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            aliases: ['ann'],
            group: 'guild',
            memberName: 'announce',
            userPermissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
            description: 'Send an announcement to the specified channel',
            examples: [`${config.prefix}announce [channel.mention] [message]`],
            args: [{
                key: 'text',
                prompt: 'What would you like the bot to announce?',
                type: 'string',
            }, ],
        });
    }

    run(message) {
        if (message.author.bot) return;

        let text = message.content.split(" ");
        let args = text.slice(1);

        if (message.channel.type === "dm") return;

        let channel = message.mentions.channels.first();
        if (!channel) return;

        let announcement = args.slice(1).join(" ");

        let embed = new MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .addField(`Announcement`, announcement, false)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
        return channel.send(embed);
    }
};