const { ShardingManager } = require('discord.js');
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.on('shardCreate', (shard) => console.log('Launching Shard: ' + shard.id));

manager.spawn('5');