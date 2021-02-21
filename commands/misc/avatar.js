const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['pfp', 'ava'],
            group: 'misc',
            memberName: 'avatar',
            description: 'Sends the avatar of a user.',
            args: [{
                type: "user",
                prompt: "Which user would you like to get the avatar of?",
                key: "user",
                default: msg => msg.author
            }]
        })
    }
    run(msg) {

        let user = msg.mentions.user.first() || msg.author
        let avatar = user.displayAvatarURL({ size: 1024 })
        let text = 'TwitchBot | twitchbot.newhorizon.dev'
        let icon = 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png'

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s avatar`)
            .setImage(avatar)
            .setURL(avatar)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(text, icon)
        msg.channel.send(embed)
            .then(console.log)
            .catch(err => {
                console.errer(err);
                msg.channel.send('There was an error with the command! Please contact a developer via our Discord!');
            });
    }
};