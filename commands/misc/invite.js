const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
require('dotenv').config();

SERVER_INVITE_URL = process.env.SERVER_INVITE
BOT_INVITE_URL = process.env.BOT_INVITE


module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['inv', 'i'],
            group: 'misc',
            memberName: 'invite',
            description: 'Grabs the bot\'s invite links',
            examples: ['invite'],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
        });
    }

    async run(msg) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Official Invites')
            .setColor("RANDOM")
            .addField("Support Server", ` - [MountainT Development](${SERVER_INVITE_URL})`)
            .addField("Bot Invite", ` - [TwitchBot](${BOT_INVITE_URL})`)
            .setTimestamp(new Date().toISOString())
            .setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
            .setURL('https://twitchbot.newhorizon.dev/')
            .setFooter(`TwitchBot | twitchbot.newhorizon.dev`, 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        msg.say(embed)
            .then(consol.log)
            .catch(err => {
                console.error(err);
                msg.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
            });
    }
};