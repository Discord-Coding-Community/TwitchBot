const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class AddRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add-role',
      aliases: ['assign-role', 'ar'],
      memberName: 'add-role',
      group: 'guild',
      description: 'Adds a specific role to a specified user.',
      examples: [
          `${config.prefix}add-role @user#1234 @member`
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
          key: 'userToAssignRole',
          prompt: 'To whom do you want to add role?',
          type: 'string'
        },
        {
          key: 'roleToAssign',
          prompt: 'Which role do you want to assign?',
          type: 'string'
        }
        ]
    });
  }
  
  async run( message, { userToAssignRole, roleToAssign }) {
    const extractNumber = /\d+/g;
    const getuserid = userToAssignRole.match(extractNumber)[0];
    const user = 
          message.mentions.members.first() || 
          (await message.guild.members.fetch(getuserid));
    const role = message.mentions.roles.first() || 
          (await message.guild.roles.fetch(roleToAssign));
    if (user == undefined)
      return message.channel.send(':x: Please try again with a valid user.');
    if (role == undefined)
      return message.channel.send(':x: Please try again with a valid role.');
    
    user.roles
      .add(role)
      .then(() => {
        const aroleEmbed = new MessageEmbed()
          .addField('Assigned Role', roleToAssign)
          .addField('To', userToAssignRole)
          .setColor(role.hexColor);
        message.channel.send(aroleEmbed);
      })
      .then( () => message.delete().catch(e => console.error(e)) ) // nested promise
      .catch(err => {
        message.reply(
          ':x: Something went wrong when trying to assign role to this user, I probably do not have the permission to assign role to him!'
        );
        return console.error(err);
      });
  }
};