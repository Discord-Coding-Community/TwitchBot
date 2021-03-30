const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class EconomyCommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'economy-commands',
            aliases: ['lvl-cmds', 'economey-help', 'lvl-help'],
            memberName: 'economy-commands',
            group: 'other',
            description: "Display's the economy commands."
        });
    }

    run(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Economy Commands')
            .setDescription('A List of available commands for the TwitchBot points system.')
            .addField('Leaderboard', `**Description**: Displays the guild\'s top 10 points leaders.\n**Examples**: ${config.prefix}leaderboard`, false)
            .addField('Points', `**Description**: Display's the users points\n**Examples**: ${config.prefix}points`, false)
            .addField('Give', `**Description**: Give a tagged user some pints.\n**Examples**: ${config.prefix}give [@user] [number]\n**Permissions**: Guild Owner Only`, false)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (err) {
        console.error(err)
        message.channel.send(
            '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
        )
    }
};