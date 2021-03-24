const { ShardingManager } = require('discord.js');
const { token } = require('./TwitchBot/config/config.json');


const manager = new ShardingManager('./index.js', {
    totalShards: 'auto',
    token: token

});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

const getServer = async (guildID) => {
    // try to get guild from all the shards
    const req = await client.shard.broadcastEval(`this.guilds.get("${guildID}")`);

    // return non-null response or false if not found
    return (req.find((res) => !!res) || false);
}
