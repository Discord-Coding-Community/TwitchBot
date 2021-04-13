const { ShardingManager } = require('discord.js');
const fetch = require("node-fetch");
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.spawn(5);

manager.on('shardCreate', (shard) => console.log('Launching Shard ' + shard.id));

manager.on('ready', () => {
    const URL = 'https://api.discordextremelist.xyz/v2/bot/' + config.applicationID + '/stats';

    const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": config.delAPI
    }

    const reqBody = {
        "guildCount": manager.shard.fetchClientValues('guilds.cache.size')
    }

    fetch(URL, { method: "POST", headers: reqHeaders, body: JSON.stringify(reqBody) })
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log(json);
        })
})

const getServer = async(guildID) => {
    const req = await manager.shard.broadcastEval(this.guilds.get + (guildID));

    return (req.find((res) => !!res) || false);
};

manager.on('message', (shard, message) => {
    console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});