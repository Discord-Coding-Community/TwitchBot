const { Command } = require('discord.js-commando');
const config = require('../../config.json');
require('../../events/levels.js')

module.exports = class NicknameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'give',
            aliases: ['givepoints', 'addpoints'],
            group: 'guild',
            memberName: 'give',
            description: "Give points to a tagged user",
            examples: [`${config.prefix}give [@user] [number]`],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            guildOnly: true,
            args: [{
                    key: 'user',
                    prompt: 'Which member do you want to give points to?',
                    type: `member`,
                    error: 'You must mention someone or give their ID!'
                },
                {
                    key: 'pointsToAdd',
                    prompt: 'how many points do you want to give?',
                    type: 'number',
                    error: 'You didn\'t tell me how many points to give...'
                }
            ]
        });
    }

    async run(message) {
        if (!message.author.id === message.guild.owner) return message.reply("You can't do that!");
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);

        const pointsToAdd = parseInt(args[1], 10);

        let userscore = client.getScore.get(user.id, message.guild.id);
        if (!userscore) {
            userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
        }
        userscore.points += pointsToAdd;
        let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
        userscore.level = userLevel;
        client.setScore.run(userscore);
        return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
    }
};