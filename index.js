const { ShardingManager } = require('discord.js');
const fetch = require("node-fetch");
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.spawn();

manager.on('shardCreate', (shard) => console.log('Launching Shard: ' + shard.id));

manager.on('ready', () => {

    const URL = 'https://api.discordextremelist.xyz/v2/bot/' + config.applicationID + '/stats';

    const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": config.delAPI
    }

    const reqBody = {
        "guildCount": manager.shard.fetchClientValues('guilds.size')
    }

    fetch(URL, { method: "POST", headers: reqHeaders, body: JSON.stringify(reqBody) })
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log(json)
                .catch(console.error);
        })
});