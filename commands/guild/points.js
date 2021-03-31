const { Command } = require('discord.js-commando');
const config = require('../../config.json');
require('../../events/levels.js')

module.exports = class PointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'points',
            aliases: ['mypoints', 'my-points', 'showpoints', 'show-my-points'],
            group: 'guild',
            memberName: 'points',
            description: "Display the user's current points in the guild.",
            examples: [`${config.prefix}points]`],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            guildOnly: true,
        });
    }

    async run(message) {
        return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
    }
};