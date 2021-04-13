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

    const res = await client.shard.broadcastEval('this.guilds.cache.get(' + GUILD_ID + ')');
    console.log(res);

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

    const getServer = async(guildID) => {

        const server = await shard.broadcastEval('this.guilds.cache.get(' + guildID + ')');

        return server.find(res => !!res) || null;
    }

    const getServerCount = async() => {
        const serverCount = await shard.fetchClientValues('guilds.cache.size');

        return serverCount.reduce((p, n) => p + n, 0);
    }
    console.log('[' + getServer + '](' + getServerCount + ')')
});