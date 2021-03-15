require('dotenv').config();

module.exports = async(client) => {

    client.user.setActivity(`help in ${client.guilds.cache.size} servers`)
        .then(console.log(`${client.user.tag} has started in ${client.guilds.cache.size} servers`))
        .catch(err => {
            console.error(err);
        });

};