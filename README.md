[![Owner](https://top.gg/api/widget/owner/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
[![UpVotes](https://top.gg/api/widget/upvotes/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
[![Status](https://top.gg/api/widget/status/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
<hr>

![](https://www.tubefilter.com/wp-content/uploads/2015/12/Twitch-Co-Stream-Game-Awards-PlayStation-Experience-2015.jpg)

# TwitchBot
Discord Twitch Integration bot built using **Discord.js-Commando** and **Twitch API**


**TwitchBot** Integrates Twitch Chat channels and Stream Notifications into Discord servers.<br>
With **TwitchBot**'s Chat integration, Server Owner's can link their Twitch channels to Discord, allowing seamless chat and Twitch stream moderation from within Discord.<br>
And with **TwitchBot** Stream Alert integration, users can add their own Twitch channels to the list of Twitch Notification Alerts within the guild.


Here's a list of TwitchBot's commands.<br>
This Guide assumes that **[p]** stands for the bot's prefix.<br>
All commands can be seen with **[p]help**.


### Commands

- Music

| Command               | Description                                                                                                               | Usage                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [p]play                 | Play any song or playlist from youtube, you can do it by searching for a song by name or song url or playlist url         | [p]play darude sandstorm                                            |
| [p]create-playlist      | Create a saved playlist                                                                                                   | [p]create-playlist EDM                                              |
| [p]delete-playlist      | Delete a playlist from your saved playlists                                                                               | [p]delete-playlist EDM                                              |
| [p]display-playlist     | Display a saved playlist                                                                                                  | [p]display-playlist EDM                                             |
| [p]my-playlists         | List your saved playlists                                                                                                 | [p]my-playlists                                                     |
| [p]remove-from-playlist | Remove a song from a saved playlist using its index                                                                       | [p]remove-from-playlist EDM 5                                       |
| [p]save-to-playlist     | Save a song or a playlist to a saved playlist                                                                             | [p]save-to-playlist EDM https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| [p]pause                | Pause the current playing song                                                                                            | [p]pause                                                            |
| [p]resume               | Resume the current paused song                                                                                            | [p]resume                                                           |
| [p]leave                | Leaves voice channel if in one                                                                                            | [p]leave                                                            |
| [p]remove               | Remove a specific song from queue by its number in queue                                                                  | [p]remove 4                                                         |
| [p]queue                | Display the song queue                                                                                                    | [p]queue                                                            |
| [p]shuffle              | Shuffle the song queue                                                                                                    | [p]shuffle                                                          |
| [p]skip                 | Skip the current playing song                                                                                             | [p]skip                                                             |
| [p]skipall              | Skip all songs in queue                                                                                                   | [p]skipall                                                          |
| [p]skipto               | Skip to a specific song in the queue, provide the song number as an argument                                              | [p]skipto 5                                                         |
| [p]volume               | Adjust song volume                                                                                                        | [p]volume 80                                                        |
| [p]music-trivia         | Engage in a music trivia with your friends. You can add more songs to the trivia pool in resources/music/musictrivia.json | [p]music-trivia                                                     |
| [p]loop                 | Loop the currently playing song                                                                                           | [p]loop 5                                                           |
| [p]loopqueue            | Loop the queue                                                                                                            | [p]loopqueue 2                                                      |
| [p]lyrics               | Get lyrics of any song or the lyrics of the currently playing song                                                        | [p]lyrics song-name                                                 |
| [p]now-playing          | Display the current playing song with a playback bar                                                                      | [p]now-playing                                                      |
| [p]move                 | Move song to a desired position in queue                                                                                  | [p]move 8 1                                                         |

- Other

| Command           | Description                                                                                                                                                        | Usage                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [p]cat              | Get a cute cat picture                                                                                                                                             | [p]cat                                                                         |
| [p]dog              | Get a cute dog picture                                                                                                                                             | [p]dog                                                                         |
| [p]fortune          | Get a fortune cookie tip                                                                                                                                           | [p]fortune                                                                     |
| [p]insult           | Generate an evil insult                                                                                                                                            | [p]insult                                                                      |
| [p]chucknorris      | Get a satirical fact about Chuck Norris                                                                                                                            | [p]chucknorris                                                                 |
| [p]motivation       | Get a random motivational quote                                                                                                                                    | [p]motivation                                                                  |
| [p]world-news       | Latest headlines from reuters, you can change the news source to whatever news source you want, just change the source in line 13 in world-news.js or ynet-news.js | [p]world-news                                                                  |
| [p]random           | Generate a random number between two provided numbers                                                                                                              | [p]random 0 100                                                                |
| [p]reddit           | Replies with 5 top non nsfw subreddit posts                                                                                                                        | [p]reddit askreddit                                                            |
| [p]say              | Make the bot say anything                                                                                                                                          | [p]say Lorem Ipsum                                                             |
| [p]sr               | Replies with the Top 10 speedrun results in every category.                                                                                                        | [p]sr super metroid                                                            |
| [p]translate        | Translate to any language using Google translate.(only supported languages)                                                                                        | [p]translate english ありがとう                                                |
| [p]about            | Info about me and the repo                                                                                                                                         | [p]about                                                                       |
| [p]8ball            | Get the answer to anything!                                                                                                                                        | [p]8ball Is this bot awesome?                                                  |
| [p]rps              | Rock Paper Scissors                                                                                                                                                | [p]rps                                                                         |
| [p]bored            | Generate a random activity!                                                                                                                                        | [p]bored                                                                       |
| [p]advice           | Get some advice!                                                                                                                                                   | [p]advice                                                                      |
| [p]kanye            | Get a random Kanye quote                                                                                                                                           | [p]kanye                                                                       |
| [p]urban dictionary | Get definitions from urban dictionary                                                                                                                              | [p]urban javascript                                                            |
| [p]poll             | Creates a poll with up to 10 choices.                                                                                                                              | [p]poll "What's your favorite food?" "Hot Dogs,Pizza,Burgers,Fruits,Veggie" 10 |
| [p]vote             | Starts a yes/no/don't care vote.                                                                                                                                   | [p]vote "Do you like to vote?." "I mean who doesn't right?!" 5                 |
| [p]twitchstatus     | A quick check to see if a streamer is currently online. or to give a shout-out a fellow streamer                                                                   | [p]twitchstatus MasterBot or !tso MasterBot                                    |
| [p]tv-show-search   | Search for Tv shows with a keyword                                                                                                                                 | [p]tv-show-search Duck                                                         |
| [p]nickname         | Sets the selected member's nickname with the provided nickname                                                                                                     | [p]nickname @Master-Bot Master                                                 |

- Gifs

| Command   | Description                         | Usage                   |
| --------- | ----------------------------------- | ----------------------- |
| [p]animegif | Get an anime related gif by a query | [p]animegif one punch man |
| [p]gif      | Get any gif by a query              | [p]gif labrador           |
| [p]gintama  | Replies with a random gintama gif   | [p]gintama                |
| [p]jojo     | Replies with a random jojo gif      | [p]jojo                   |

- Guild

| Command                    | Description                                                                    | Usage                                |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| [p]ban                       | Bans a tagged member                                                           | [p]ban @johndoe                        |
| [p]invite                    | Replies with a link to invite the bot.                                         | [p]invite                              |
| [p]kick                      | Kicks a tagged member                                                          | [p]kick @johndoe                       |
| [p]prune                     | Delete up to 99 recent messages                                                | [p]prune 50                            |
| [p]welcome-message           | Allows you to toggle the welcome message for new members that join the server. | [p]welcome-message enable              |
| [p]twitch-announcer          | Allows you to Enable, Disable or Check the Twitch Announcer.                   | [p]ta enable                           |
| [p]twitch-announcer-settings | Settings for the Twitch Announcer.                                             | [p]tasettings Bacon_Fixation general 1 |


### Support
- [MountainT Development](https://dsc.gg/mtdev)
- [Discord Coding Community](https://dsc.gg/discord-coding-community)