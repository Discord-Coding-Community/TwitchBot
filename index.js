const { ShardingManager } = require('discord.js');
const { shards, clientTOKEN } = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
    shardArgs: ['--ansi', '--color'],
    totalShards: shards,
    token: clientTOKEN

});

manager.on('shardCreate', (shard) => console.log('Connecting to Shard: ' + shard.id));

manager.spawn(5);