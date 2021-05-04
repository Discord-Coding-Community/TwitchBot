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
            .setTitle('TwitchBot')
            .setDescription('Thank you for using TwitchBot\n\nHere is a list of our base commands: [TwitchBot | Commands](https://discord-coding-community.gitbook.io/twitchbot/commands)\nYou can find a full list of commands on our wiki here: [TwitchBot | Wiki](https://discord-coding-community.gitbook.io/twitchbot/twitchbot/wiki#commands)')
            .setColor('RANDOM')
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