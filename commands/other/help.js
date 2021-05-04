const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: [
                'h',
                'cmds',
                'commands',
                'cmdhelp'
            ],
            memberName: 'help',
            group: 'other',
            description: "Displays the command help.",
            examples: [
                prefix + 'help'
            ]
        });
    }

    run(message) {
        let embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setDescription('Thank you for choosing ' + this.client.user.username + ' \n\n**__Commands__**\n\n:white_small_square:[Base Commands](https://discord-coding-community.gitbook.io/twitchbot/commands)\n:white_small_square:[All Commands](https://discord-coding-community.gitbook.io/twitchbot/wiki#commands)\n\n\n**__Support Servers__**\n\n:white_small_square:[MountainT Development](https://discord.me/mtdev)\n:white_small_square:[Discord Coding Community](https://discord.me/discord-coding-community)')
            .setColor('RANDOM')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (err) {
        console.error(err)
        message.reply(
            ':x: Something went wrong... If the problem continues, please contact support!'
        )
    }
};