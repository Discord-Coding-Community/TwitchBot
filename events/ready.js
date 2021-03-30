const client = require('discord.js-commando');
const config = require('../../config.json');
const Canvas = require('canvas');

module.exports = {
    name: 'ready',
    once: true,
    async execute() {
        console.log(`${client.user.tag} is Ready!`);
        client.user.setActivity(`${config.prefix}help`, {
            type: 'WATCHING',
            url: 'https://github.com/Discord-Coding-Community/TwitchBot'
        });
        const Guilds = client.guilds.cache.map(guild => guild.name);
        console.log(Guilds, 'Connected!');
        // Registering font For Cloud Services
        Canvas.registerFont('././resources/welcome/OpenSans-Light.ttf', {
            family: 'Open Sans Light'
        });
    }
};