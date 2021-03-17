[![UpVotes](https://top.gg/api/widget/upvotes/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
[![Status](https://top.gg/api/widget/status/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
[![Discord Bots](https://top.gg/api/widget/servers/727930437997166653.svg)](https://top.gg/bot/727930437997166653)
<hr>

![](https://www.tubefilter.com/wp-content/uploads/2015/12/Twitch-Co-Stream-Game-Awards-PlayStation-Experience-2015.jpg)

# TwitchBot
Discord Twitch Integration bot built using **Discord.js-Commando** and **Twitch API**


**TwitchBot** Integrates Twitch Chat channels and Stream Notifications into Discord servers while also providing plenty of extra goodies to keep you entertained.<br>


Here's a list of TwitchBot's commands.<br>

### Commands

- Music

| Command               | Description                                                                                                               | Usage                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| play                 | Play any song or playlist from youtube, you can do it by searching for a song by name or song url or playlist url         | play darude sandstorm                                            |
| create-playlist      | Create a saved playlist                                                                                                   | create-playlist EDM                                              |
| delete-playlist      | Delete a playlist from your saved playlists                                                                               | delete-playlist EDM                                              |
| display-playlist     | Display a saved playlist                                                                                                  | display-playlist EDM                                             |
| my-playlists         | List your saved playlists                                                                                                 | my-playlists                                                     |
| remove-from-playlist | Remove a song from a saved playlist using its index                                                                       | remove-from-playlist EDM 5                                       |
| save-to-playlist     | Save a song or a playlist to a saved playlist                                                                             | save-to-playlist EDM https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| pause                | Pause the current playing song                                                                                            | pause                                                            |
| resume               | Resume the current paused song                                                                                            | resume                                                           |
| leave                | Leaves voice channel if in one                                                                                            | leave                                                            |
| remove               | Remove a specific song from queue by its number in queue                                                                  | remove 4                                                         |
| queue                | Display the song queue                                                                                                    | queue                                                            |
| shuffle              | Shuffle the song queue                                                                                                    | shuffle                                                          |
| skip                 | Skip the current playing song                                                                                             | skip                                                             |
| skipall              | Skip all songs in queue                                                                                                   | skipall                                                          |
| skipto               | Skip to a specific song in the queue, provide the song number as an argument                                              | skipto 5                                                         |
| volume               | Adjust song volume                                                                                                        | volume 80                                                        |
| music-trivia         | Engage in a music trivia with your friends. You can add more songs to the trivia pool in resources/music/musictrivia.json | music-trivia                                                     |
| loop                 | Loop the currently playing song                                                                                           | loop 5                                                           |
| loopqueue            | Loop the queue                                                                                                            | loopqueue 2                                                      |
| lyrics               | Get lyrics of any song or the lyrics of the currently playing song                                                        | lyrics song-name                                                 |
| now-playing          | Display the current playing song with a playback bar                                                                      | now-playing                                                      |
| move                 | Move song to a desired position in queue                                                                                  | move 8 1                                                         |

- Other

| Command           | Description                                                                                                                                                        | Usage                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| cat              | Get a cute cat picture                                                                                                                                             | cat                                                                         |
| dog              | Get a cute dog picture                                                                                                                                             | dog                                                                         |
| fortune          | Get a fortune cookie tip                                                                                                                                           | fortune                                                                     |
| insult           | Generate an evil insult                                                                                                                                            | insult                                                                      |
| chucknorris      | Get a satirical fact about Chuck Norris                                                                                                                            | chucknorris                                                                 |
| motivation       | Get a random motivational quote                                                                                                                                    | motivation                                                                  |
| world-news       | Latest headlines from reuters, you can change the news source to whatever news source you want, just change the source in line 13 in world-news.js or ynet-news.js | world-news                                                                  |
| random           | Generate a random number between two provided numbers                                                                                                              | random 0 100                                                                |
| reddit           | Replies with 5 top non nsfw subreddit posts                                                                                                                        | reddit askreddit                                                            |
| say              | Make the bot say anything                                                                                                                                          | say Lorem Ipsum                                                             |
| sr               | Replies with the Top 10 speedrun results in every category.                                                                                                        | sr super metroid                                                            |
| translate        | Translate to any language using Google translate.(only supported languages)                                                                                        | translate english ありがとう                                                |
| about            | Info about me and the repo                                                                                                                                         | about                                                                       |
| 8ball            | Get the answer to anything!                                                                                                                                        | 8ball Is this bot awesome?                                                  |
| rps              | Rock Paper Scissors                                                                                                                                                | rps                                                                         |
| bored            | Generate a random activity!                                                                                                                                        | bored                                                                       |
| advice           | Get some advice!                                                                                                                                                   | advice                                                                      |
| kanye            | Get a random Kanye quote                                                                                                                                           | kanye                                                                       |
| urban dictionary | Get definitions from urban dictionary                                                                                                                              | urban javascript                                                            |
| poll             | Creates a poll with up to 10 choices.                                                                                                                              | poll "What's your favorite food?" "Hot Dogs,Pizza,Burgers,Fruits,Veggie" 10 |
| vote             | Starts a yes/no/don't care vote.                                                                                                                                   | vote "Do you like to vote?." "I mean who doesn't right?!" 5                 |
| twitchstatus     | A quick check to see if a streamer is currently online. or to give a shout-out a fellow streamer                                                                   | twitchstatus johndoe or !tso johndoe                                    |
| tv-show-search   | Search for Tv shows with a keyword                                                                                                                                 | tv-show-search Duck                                                         |
| nickname         | Sets the selected member's nickname with the provided nickname                                                                                                     | nickname @johndoe John                                                 |
| help             | Displays a link to the commands page                                                                                                                               | help                                                         |

- Gifs

| Command          | Description                                           | Usage                                                                                                       |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| animegif         | Get an anime related gif by a query                   | animegif one punch man                                                                                      |
| gif              | Get any gif by a query                                | gif labrador                                                                                                |
| gintama          | Replies with a random gintama gif                     | gintama                                                                                                     |
| jojo             | Replies with a random jojo gif                        | jojo                                                                                                        |
| baka             | Replies with a random anime baka gif                  | baka                                                                                                        |
| slap             | Replies with a random anime slap gif                  | slap                                                                                                        |
| hug              | Replies with a random anime hug  gif                  | hug                                                                                                         |
| pat              | Replies with a random anime pat  gif                  | pat                                                                                                         |

- Guild

| Command                    | Description                                                                    | Usage                                |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| ban                       | Bans a tagged member                                                           | ban @johndoe                        |
| invite                    | Replies with a link to invite the bot.                                         | invite                              |
| kick                      | Kicks a tagged member                                                          | kick @johndoe                       |
| prune                     | Delete up to 99 recent messages                                                | prune 50                            |
| welcome-message           | Allows you to toggle the welcome message for new members that join the server. | welcome-message enable              |
| twitch-announcer          | Allows you to Enable, Disable or Check the Twitch Announcer.                   | ta enable                           |
| twitch-announcer-settings | Settings for the Twitch Announcer.                                             | tasettings Bacon_Fixation general 1 |


### Support
- [MountainT Development](https://dsc.gg/mtdev)
- [Discord Coding Community](https://dsc.gg/discord-coding-community)
