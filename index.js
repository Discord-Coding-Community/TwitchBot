const { ShardingManager } = require('discord.js');
const config = require('./config.json');


const manager = new ShardingManager('./bot.js', {
    totalShards: config.shards,
    token: config.clientTOKEN

});

manager.spawn(3);

manager.on('shardCreate', (shard) => console.log('Launching Shard ' + shard.id));

const getServer = async(guildID) => {
    const req = await manager.shard.broadcastEval(this.guilds.get + (guildID));

    return (req.find((res) => !!res) || false);
};