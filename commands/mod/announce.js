const stripIndents = require('common-tags').stripIndents;
const { Command } = require('discord.js-commando');
require('dotenv').config();

ANNOUNCE_CHANNEL_NAME = process.env.ANNOUNCEMENT_CHANNEL;
NEWS_CHANNEL_NAME = process.env.NEWS_CHANNEL;
MODLOG_CHANNEL_NAME = process.env.MODLOG_CHANNEL;

module.exports = class NewsCommand extends Command {
    constructor (client) {
      super(client, {
        name: 'announce',
        memberName: 'announce',
        group: 'mod',
        aliases: ['news', 'ann', 'a'],
        description: 'Make an announcement in the news channel',
        format: 'Announcement',
        examples: ['announce John Appleseed reads the news'],
        guildOnly: true,
        throttling: {
          usages: 2,
          duration: 3
        },
        args: [
          {
            key: 'body',
            prompt: 'What do you want me to announce?',
            type: 'string'
          }
        ],
        userPermissions: ['MANAGE_MESSAGES'],
        clientPermissions: ['MANAGE_MESSAGES']
      });
    }
  
    run (msg, {body}) {
      try {
        channel.startTyping(msg);
  
        let announce = body,
          newsChannel = null;
  
        const announceEmbed = new MessageEmbed(),
          modlogChannel = msg.guild.settings.get('modLogChannel',
            msg.guild.channels.find(c => c.name === MODLOG_CHANNEL) ? msg.guild.channels.find(c => c.name === MODLOG_CHANNEL).id : null);
  
        if (msg.guild.settings.get('announcechannel')) {
          newsChannel = msg.guild.channels.find(c => c.id === msg.guild.settings.get('announcechannel'));
        } else {
          msg.guild.channels.find(c => c.name === 'announcements')
            ? newsChannel = msg.guild.channels.find(c => c.name === ANNOUNCEMENT_CHANNEL)
            : newsChannel = msg.guild.channels.find(c => c.name === NEWS_CHANNEL);
        }
  
        if (!newsChannel) throw new Error('nochannel');
        if (!newsChannel.permissionsFor(msg.guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) throw new Error('noperms');
  
        newsChannel.startTyping(1);
  
        announce.slice(0, 4) !== 'http' ? announce = `${body.slice(0, 1).toUpperCase()}${body.slice(1)}` : null;
        msg.attachments.first() && msg.attachments.first().url ? announce += `\n${msg.attachments.first().url}` : null;
  
        announceEmbed
          .setColor('#AAEFE6')
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setDescription(stripIndents`**Action:** Made an announcement`)
          .setTimestamp();
  
        newsChannel.msg.say(announce);
        newsChannel.stopTyping(true);
  
        if (msg.guild.settings.get('mod-logs', true)) {
          if (!msg.guild.settings.get('hasSentModLogMessage', false)) {
            msg.reply(oneLine`📃 I can keep a log of moderator actions if you create a channel named **${MODLOG_CHANNEL_NAME}**
                          (or some other name configured by the ${msg.guild.commandPrefix}setmodlogs command) and give me access to it.
                          This message will only show up this one time and never again after this so if you desire to set up mod logs make sure to do so now.`);
            msg.guild.settings.set('hasSentModLogMessage', true);
          }
          modlogChannel && msg.guild.settings.get('mod-logs', false) ? msg.guild.channels.get(modlogChannel).msg.say('', {embed: announceEmbed}) : null;
        }
  
        stopTyping(msg);
  
        return msg.embed(announceEmbed);
  
      } catch (err) {
        channel.stopTyping(msg);
  
        if ((/(?:nochannel)/i).test(err.toString())) {
          return msg.reply(`there is no channel for me to make the announcement in. Create channel named either ${ANNOUNCE_CHANNEL_NAME} or ${NEWS_CHANNEL_NAME}`);
        } else if ((/(?:noperms)/i).test(err.toString())) {
          return msg.reply(`I do not have permission to send messages to the ${ANNOUNCE_CHANNEL_NAME} or ${NEWS_CHANNEL_NAME} channel. Better go fix that!`);
        }
  
  
        return msg.reply(oneLine`An error occurred but I notified ${this.client.owners[0].username}
        Want to know more about the error? Join the support server by getting an invite by using the \`${msg.guild.commandPrefix}invite\` command `);
      }
    }
};