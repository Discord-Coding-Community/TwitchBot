const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const TwitchAPI = require('../../resources/twitch/twitch-api.js');
const probe = require('probe-image-size');
const Canvas = require('canvas');
const {
    twitchClientID,
    twitchClientSecret,
    prefix
} = require('../../config.json');

if (!twitchClientID || !twitchClientSecret) return;

module.exports = class TwitchAnnouncerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'twitch-announcer',
            memberName: 'twitch-announcer',
            aliases: [
                'ta'
            ],
            group: 'guild',
            guildOnly: true,
            userPermissions: [
                'MANAGE_MESSAGES',
                'MANAGE_GUILD',
                'MANAGE_CHANNELS',
                'MANAGE_ROLES',
                'MENTION_EVERYONE'
            ],
            clientPermissions: [
                'MANAGE_MESSAGES',
                'MANAGE_GUILD',
                'MANAGE_CHANNELS',
                'MANAGE_ROLES',
                'MENTION_EVERYONE'
            ],
            examples: [
                '`' + prefix + 'twitch-announcer enable`',
                '`' + prefix + 'twitch-announcer disable`',
                '`' + prefix + 'twitch-announcer check`'
            ],
            description: 'Allows you to ***Enable***, ***Disable*** or ***Check*** the Twitch Announcer.',
            args: [{
                key: 'textRaw',
                prompt: 'Would you like to ***Enable***, ***Disable*** or ***Check*** the Twitch Announcer?',
                type: 'string',
                oneOf: ['enable', 'disable', 'check']
            }]
        });
    }

    async run(message, { textRaw }) {
        var Twitch_DB = new db.table('Twitch_DB');
        const DBInfo = Twitch_DB.get(`${message.guild.id}.twitchAnnouncer`);

        var textFiltered = textRaw.toLowerCase();
        var currentMsgStatus;
        var currentGame;
        var embedID;

        if (DBInfo == undefined) {
            message.reply(
                ':no_entry: No settings were found, please run `' +
                `${prefix}twitch-announcer-settings` +
                '` first'
            );
            return;
        }

        const scope = 'user:read:email';
        let access_token;
        let streamInfo;
        let gameInfo;
        try {
            access_token = await TwitchAPI.getToken(
                twitchClientID,
                twitchClientSecret,
                scope
            );
        } catch (e) {
            clearInterval(Ticker);
            message.reply(':x: Twitch Announcer has stopped!\n' + e);
            return;
        }

        try {
            var user = await TwitchAPI.getUserInfo(
                access_token,
                twitchClientID,
                `${DBInfo.name}`
            );
        } catch (e) {
            clearInterval(Ticker);
            message.reply(':x: Twitch Announcer has stopped!\n' + e);
            return;
        }

        const enabledEmbed = new MessageEmbed()
            .setAuthor(
                message.member.guild.name + ' Announcer Settings',
                'https://images-ext-2.discordapp.net/external/YGcRORVMKO1Zi0izJkJEJSoFu4CBlZ9qrj9ptseHGCo/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.webp',
                'https://twitch.tv/' + user.data[0].display_name
            )
            .setTitle(`:white_check_mark: Twitch Announcer Enabled!`)
            .setColor('#6441A4')
            .setThumbnail(user.data[0].profile_image_url)
            .addField('Pre-Notification Message', `${DBInfo.botSay}`)
            .addField(`Streamer`, `${DBInfo.name}`, true)
            .addField(`Channel`, `${DBInfo.channel}`, true)
            .addField(`Checking Interval`, `***${DBInfo.timer}*** minute(s)`, true)
            .addField('View Counter:', user.data[0].view_count, true);
        if (user.data[0].broadcaster_type == '')
            enabledEmbed.addField('Rank:', 'BASE!', true);
        else {
            enabledEmbed
                .addField(
                    'Rank:',
                    user.data[0].broadcaster_type.toUpperCase() + '!',
                    true
                )
                .setFooter(DBInfo.savedName, DBInfo.savedAvatar)
                .setTimestamp(DBInfo.date);
        }

        const disabledEmbed = new MessageEmbed()
            .setAuthor(
                message.member.guild.name + ' Announcer Settings',
                'https://images-ext-2.discordapp.net/external/YGcRORVMKO1Zi0izJkJEJSoFu4CBlZ9qrj9ptseHGCo/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.webp',
                'https://twitch.tv/' + user.data[0].display_name
            )
            .setTitle(`:x: Twitch Announcer Disabled!`)
            .setColor('#6441A4')
            .setThumbnail(user.data[0].profile_image_url)
            .addField('Pre-Notification Message', `${DBInfo.botSay}`)
            .addField(`Streamer`, `${DBInfo.name}`, true)
            .addField(`Channel`, `${DBInfo.channel}`, true)
            .addField(`Checking Interval`, `***${DBInfo.timer}*** minute(s)`, true)
            .addField('View Counter:', user.data[0].view_count, true);
        if (user.data[0].broadcaster_type == '')
            disabledEmbed.addField('Rank:', 'BASE!', true);
        else {
            disabledEmbed
                .addField(
                    'Rank:',
                    user.data[0].broadcaster_type.toUpperCase() + '!',
                    true
                )
                .setFooter(DBInfo.savedName, DBInfo.savedAvatar)
                .setTimestamp(DBInfo.date);
        }

        if (textFiltered == 'check') {
            if (currentMsgStatus == 'disable') message.channel.send(disabledEmbed);
            else {
                message.channel.send(enabledEmbed);
                return;
            }
            return;
        }
        if (textFiltered == 'disable') {
            currentMsgStatus = 'disable';
            message.channel.send(disabledEmbed);
        }

        if (textFiltered == 'enable') {
            currentMsgStatus = 'enable';
            message.channel.send(enabledEmbed);

            var Ticker = setInterval(async function() {
                if (currentMsgStatus == 'disable') {
                    clearInterval(Ticker);
                    return;
                }

                let announcedChannel = message.guild.channels.cache.find(
                    channel => channel.id == DBInfo.channelID
                );
                try {
                    access_token = await TwitchAPI.getToken(
                        twitchClientID,
                        twitchClientSecret,
                        scope
                    );
                } catch (e) {
                    clearInterval(Ticker);
                    message.reply(':x: Twitch Announcer has stopped!\n' + e);
                    return;
                }

                try {
                    user = await TwitchAPI.getUserInfo(
                        access_token,
                        twitchClientID,
                        `${DBInfo.name}`
                    );
                } catch (e) {
                    clearInterval(Ticker);
                    message.reply(':x: Twitch Announcer has stopped!\n' + e);
                    return;
                }

                var user_id = user.data[0].id;
                try {
                    streamInfo = await TwitchAPI.getStream(
                        access_token,
                        twitchClientID,
                        user_id
                    );
                } catch (e) {
                    clearInterval(Ticker);
                    message.reply(':x: Twitch Announcer has stopped!\n' + e);
                    return;
                }

                if (!streamInfo.data[0] && currentMsgStatus == 'sent') {
                    currentMsgStatus = 'offline';
                }
                if (
                    currentMsgStatus != 'sent' &&
                    streamInfo.data[0] &&
                    currentMsgStatus != 'disable'
                ) {
                    currentMsgStatus = 'online';
                }

                if (currentMsgStatus == 'online') {
                    currentGame = streamInfo.data[0].game_name;

                    try {
                        gameInfo = await TwitchAPI.getGames(
                            access_token,
                            twitchClientID,
                            streamInfo.data[0].game_id
                        );

                        var result = await probe(
                            gameInfo.data[0].box_art_url.replace(/-{width}x{height}/g, '')
                        );
                        var canvas = Canvas.createCanvas(result.width, result.height);
                        var ctx = canvas.getContext('2d');
                        var background = await Canvas.loadImage(
                            gameInfo.data[0].box_art_url.replace(/-{width}x{height}/g, '')
                        );
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        var attachment = new MessageAttachment(
                            canvas.toBuffer(),
                            'box_art.png'
                        );
                    } catch (e) {
                        clearInterval(Ticker);
                        message.reply(':x: Twitch Announcer has stopped!\n' + e);
                        return;
                    }

                    const onlineEmbed = new MessageEmbed()
                        .setAuthor(
                            `Twitch Announcement: ${user.data[0].display_name} Online!`,
                            user.data[0].profile_image_url,
                            'https://twitch.tv/' + user.data[0].display_name
                        )
                        .setURL('https://twitch.tv/' + user.data[0].display_name)
                        .setTitle(user.data[0].display_name + ' is playing ' + currentGame)
                        .addField('Stream Title:', streamInfo.data[0].title)
                        .addField('Currently Playing:', streamInfo.data[0].game_name, true)
                        .addField('Viewers:', streamInfo.data[0].viewer_count, true)
                        .setColor('#6441A4')
                        .setFooter(
                            'Stream Started',
                            'https://images-ext-2.discordapp.net/external/YGcRORVMKO1Zi0izJkJEJSoFu4CBlZ9qrj9ptseHGCo/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.webp'
                        )
                        .setImage(
                            streamInfo.data[0].thumbnail_url
                            .replace(/{width}x{height}/g, '1280x720')
                            .concat('?r=' + Math.floor(Math.random() * 10000 + 1))
                        )
                        .setTimestamp(streamInfo.data[0].started_at)
                        .attachFiles(attachment)
                        .setThumbnail('attachment://box_art.png');

                    if (user.data[0].broadcaster_type == '')
                        onlineEmbed.addField('Rank:', 'BASE!', true);
                    else {
                        onlineEmbed.addField(
                            'Rank:',
                            user.data[0].broadcaster_type.toUpperCase() + '!',
                            true
                        );
                    }

                    try {
                        if (DBInfo.botSay.toLowerCase() != 'none') {
                            await announcedChannel.send(DBInfo.botSay),
                                await announcedChannel.send(onlineEmbed);
                            embedID = announcedChannel.lastMessage.id;
                        } else {
                            await announcedChannel.send(onlineEmbed);
                            embedID = announcedChannel.lastMessage.id;
                        }
                    } catch (error) {
                        message.reply(':x: Could not send message to channel');
                        console.log(error);
                        clearInterval(Ticker);
                        return;
                    }
                    currentMsgStatus = 'sent';
                }

                if (currentMsgStatus == 'offline') {
                    currentMsgStatus = 'end';
                    const offlineEmbed = new MessageEmbed()
                        .setAuthor(
                            `Twitch Announcement: ${user.data[0].display_name} Offline`,
                            user.data[0].profile_image_url,
                            'https://twitch.tv/' + user.data[0].display_name
                        )
                        .setTitle(user.data[0].display_name + ' was playing ' + currentGame)
                        .setColor('#6441A4')
                        .setTimestamp()
                        .setFooter(
                            'Stream Ended',
                            'https://images-ext-2.discordapp.net/external/YGcRORVMKO1Zi0izJkJEJSoFu4CBlZ9qrj9ptseHGCo/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.webp'
                        )
                        .setThumbnail('attachment://box_art.png');

                    if (!user.data[0].description == '')
                        offlineEmbed
                        .addField('Profile Description:', user.data[0].description)

                    .addField('View Counter:', user.data[0].view_count, true);
                    if (user.data[0].broadcaster_type == '')
                        offlineEmbed.addField('Rank:', 'BASE!', true);
                    else {
                        offlineEmbed.addField(
                            'Rank:',
                            user.data[0].broadcaster_type.toUpperCase() + '!',
                            true
                        );
                    }


                    try {
                        await announcedChannel.messages
                            .fetch({
                                around: embedID,
                                limit: 1
                            })
                            .then(msg => {
                                const fetchedMsg = msg.first();
                                fetchedMsg.edit(offlineEmbed);
                            });
                    } catch (error) {
                        message.reply(':x: Could not edit message');
                        console.log(error);
                        clearInterval(Ticker);
                        return;
                    }
                }
            }, DBInfo.timer * 60000);
        }
    }
};