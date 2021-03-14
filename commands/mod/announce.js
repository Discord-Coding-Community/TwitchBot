const Discord = require('discord.js');
const { Util } = require('discord.js')
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
        let ch = msg.mentions.channels.first();
        let embed = new Discord.MessageEmbed();
        embed.setAuthor('Twitchbot', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        embed.setFooter('Twitchbot | twitchbot.newhorizon.dev', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        embed.setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        embed.setColor('RANDOM')
        embed.setTitle('Announcement')
        embed.setDescription(`${Util.cleanContent(text)}`)
        embed.setTimestamp(new Date().toISOString())
        embed.setFooter('Twitchbot | twitchbot.newhorizon.dev', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        ch.send(embed = embed)
            .then(console.log)
            .catch(err => {
                console.error(err);
                msg.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
            });

    }
};