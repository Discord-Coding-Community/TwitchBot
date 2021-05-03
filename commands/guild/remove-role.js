const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class RRCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove-role',
      aliases: ['del-role', 'rr'],
      memberName: 'remove-role',
      group: 'guild',
      description: 'Removes a specific role from a specified user.',
      examples: [
          config.prefix + 'remove-role @user#1234 @member',
          config.prefix + 'del-role @user#1234 @member',
          config.prefix + 'rr @user#1234 @member'
      ],  
      guildOnly: true,
      userPermissions: [
          'MANAGE_ROLES'
      ],
      clientPermissions: [
          'MANAGE_ROLES'
      ],  
      args: [
        {
          key: 'userToRemoveRole',
          prompt: 'To whom do you want to remove role from?',
          type: 'string'
        },
        {
          key: 'roleToRemove',
          prompt: 'Which role do you want to remove?',
          type: 'string'
        }
        ]
    });
  }

  async run( message, { userToRemoveRole, roleToRemove }) {
    const extractNumber = /\d+/g;
    const getuserid = userToRemoveRole.match(extractNumber)[0];
    const user = 
          message.mentions.members.first() || 
          (await message.guild.members.fetch(getuserid));
    const role = message.mentions.roles.first() || 
          (await message.guild.roles.fetch(roleToRemove));
    if (user == undefined)
      return message.channel.send(':x: Please try again with a valid user.');
    if (role == undefined)
      return message.channel.send(':x: Please try again with a valid role.');

    user.roles
      .remove(role)
      .then(() => {
        const rroleEmbed = new MessageEmbed()
          .addField('Removed Role', roleToRemove)
          .addField('From', userToRemoveRole)
          .setColor(role.hexColor);
        message.channel.send(rroleEmbed);
      })
      .then( () => message.delete()
      .catch(function onError(err) {
        message.reply(
          ':x: Something went wrong.... If the problem continues, please contact support.'
        );
        return console.error(err);
      });
  }
};