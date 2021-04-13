const { ShardingManager } = require('discord.js');
const fetch = require("node-fetch");
const AutoPoster = require('topgg-autoposter');
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.spawn(5);

manager.on('shardCreate', (shard) => console.log('Launching Shard ' + shard.id));

manager.on('connect', (shard) => {
    const URL = 'https://api.discordextremelist.xyz/v2/bot/' + config.applicationID + '/stats';

    const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": config.delAPI
    }

    const reqBody = {
        "guildCount": shard.fetchClientValues('guilds.size')
    }

    fetch(URL, { method: "POST", headers: reqHeaders, body: JSON.stringify(reqBody) })
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log(json);
        })

    const ap = AutoPoster(config.apAPI, manager)

    ap.on('posted', () => {

        console.log('Posted stats to Top.gg!')
    })
});

manager.on('message', async(shard, message, error) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'status') {
        let values = await shard.broadcastEval(`[this.shard.id, this.guilds.size]`);
        let response = '**__Shard Status__**\n';
        values.forEach((value) => {
            response += ' • **Shard**: ' + value[0] + ' | • **Total Guilds**: ' + value[1] + ' • | **Total Users**: ' + value[2] + '\n';
        });
        message.reply(response);
        return console.log(error);
    } else if (command === 'eval') {

        message.reply(' • **Shard**: ' + '[' + shard.id + '] : ' + message._eval + ' : ' + message._result);
        return console.log(error);
    }
});