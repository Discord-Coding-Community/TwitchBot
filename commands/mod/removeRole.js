const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class removeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "removerole",
            aliases: ["remove-role", "rrole"],
            group: 'mod',
            memberName: 'removerole',
            description: 'Removes a role from a user.',
            args: [{
                    type: "user",
                    prompt: "Which user would you like to remove the role from?",
                    key: "user",
                },
                {
                    type: "role",
                    prompt: "Which role would you like to remove?",
                    key: "role"
                }
            ]
        })
    }
    run(msg, { user, role }) {

        msg.guild.member(user).removeRole(role)
        let embed = new Discord.MessageEmbed()
            .setTitle('Role Updated')
            .setDescription('Successfully took away the role ' + role + ' from ' + user)
            .setTimestamp()
            .setColor('RANDOM')
            .setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
            .setURL('https://twitchbot.newhorizon.dev/')
            .setFooter(`TwitchBot | twitchbot.newhorizon.dev`, 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        msg.say(embed)
            .then(console.log)
            .catch(err => {
                console.error(err);
                message.channel.send('There was an error with the command! Please contact a developer via our Discord!');
            })
    }
};