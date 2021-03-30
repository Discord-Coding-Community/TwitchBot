const client = require('discord.js-commando');

module.exports = {
    name: 'voiceStatusUpdate',
    once: false,
    async execute(___, newState) {
        if (
            newState.member.user.bot &&
            !newState.channelID &&
            newState.guild.musicData.songDispatcher &&
            newState.member.user.id == client.user.id
        ) {
            newState.guild.musicData.queue.length = 0;
            newState.guild.musicData.songDispatcher.end();
            return;
        }
        if (
            newState.member.user.bot &&
            newState.channelID &&
            newState.member.user.id == client.user.id &&
            !newState.selfDeaf
        ) {
            newState.setSelfDeaf(true);
        }
    }
};