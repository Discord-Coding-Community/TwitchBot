const { ShardingManager } = require('discord.js');
const { shards, clientTOKEN } = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    execArgv: [
        '--trace-warnings'
    ],
    shardArgs: [
        '--ansi',
        '--color'
    ],
    totalShards: shards,
    token: clientTOKEN

});

manager.on('shardCreate', (shard) => console.log('Connecting to Shard: ' + shard.id));

manager.on('shardError', error => {
    try {} catch (e) {
        let (e) = error;
        if ((e) instanceof shardError) Error.captureStackTrace(e);
        console.error('[ERROR] A web socket has encountered an error:', (e));
    }
});

manager.spawn('auto');