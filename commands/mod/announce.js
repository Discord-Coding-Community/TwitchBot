const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
module.exports = class newsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            aliases: ['a', 'ann', 'say', 's'],
            group: 'mod',
            memberName: 'announce',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 10
            },
            description: 'Sends a message to a specified channel.',
            examples: ['ann This is an announcement.'],
            args: [{
                key: 'text',
                prompt: 'What would you like to announce?',
                type: 'string',
            }, ],
        })
    };

    run(msg, { text }) {
        msg.guild.channels.cache
        let embed = new Discord.RichEmbed();
        let ch = msg.mentions.channels.first()
            .setAuthor({
                name = `${client.name}`,
                icon = `${icon = client.avatarUrl}`
            })
            .setFooter({
                text = clientname + '| twitchbot.newhorizon.dev',
                icon = client.avatarUrl
            })
            .setThumbnail(client.avatarUrl)
            .setTitle('Announcement')
            .setDescription(`${text}`)
            .setTimestamp(new Date().toISOString())
            .setFooter({
                text = client.name + '| twitchbot.newhorizon.dev',
                icon_url = client.avatarUrl
            })
        ch.send(embed)
            .then(console.log)
            .catch(err => {
                console.error(err);
                msg.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
            });

    }
};