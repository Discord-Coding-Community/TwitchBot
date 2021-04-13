const { ShardingManager } = require('discord.js');
const fetch = require("node-fetch");
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.spawn('auto');

manager.on('shardCreate', (shard) => console.log('Launching Shard: ' + shard.id));

manager.on('connect', async(shard) => {

    const URL = 'https://api.discordextremelist.xyz/v2/bot/' + config.applicationID + '/stats';

    const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": config.delAPI
    }

    const reqBody = {
        "guildCount": shard.fetchClientValues('guilds.cache.size')
    }

    fetch(URL, { method: "POST", headers: reqHeaders, body: JSON.stringify(reqBody) })
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log(json)
        })

    shard.broadcastEval(`
        (async () => {
            const srvCount = await shard.fetchClientValues('guilds.cache.size');
            const usrCount = await shard.broadcastEval('this.guilds.cache.map((guild) => guild.members.cache.size)');
            let channel = await this.channels.cache.get('831627743120588891')
            if (channel) {
                let MessageEmbed = require('discord.js');
                let embed = new MessageEmbed()
                .setTitle('**_Shard Status_**')
                .setDescription('▫️ **Total Guilds**: ${srvCount.reduce((p, n) => p + n, 0)}｜▫️ **Total Users**: ${usrCount}')
                .setColor('RANDOM')
                channel.send({ embed: ${JSON.stringify(embed)} });
            }
        })();
    `);
});