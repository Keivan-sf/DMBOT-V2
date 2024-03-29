const Disocrd = require('discord.js');
const { MessageEmbed } = Disocrd;
const { MessageButton } = require(`../../modified_modules/discord-buttons/src/index`);

const ContactUs = new MessageEmbed()
.setTitle("Contact us")
.setDescription(
`If you've faced any kind of **bugs or crashes**
Or if you have any **suggestions or ideas**

Please contact :

\`Keivan#7981\` on Discord

[@ke1vans](https://t.me/ke1vans) on Telegram`)


let helptext = `
Help & Usage
Music Commands

\`.play\` or \`.p\` : to play a song based on name or link
Example:
.play Pharrell Williams - Happy
.play https://www.youtube.com/watch?v=ZbZSe6N_BXs
Supported links: Youtube - Soundcloud - Spotify

\`.stop\` or \`.pause\` : to pause the current song

\`.resume\` : to resume the current paused song

\`.next\` or \`.skip\` or \`.n\` : to skip the current song

\`.disconnect\` or \`.dc\` : to disconnect the bot from the current channel

\`.loop\` or \`.repeat\` : to loop the current song

\`.lq\` or \`.loopq\` : to loop the queue

\`.search\` : to search for a song based on name
Example:
.search Pharrell Williams Happy

⭐ \`.suggestions\` or \`.autoplay\` or \`.sg\` : to get suggestions based on what you've been listening to

\`.playlist\` : to access the playlist menu

\`.save\` : to save the current song in your playlist
Also can be used like .save before you go to save a specific song

\`.np\` : to see the current song and timestamp

\`.clear\` : to clear the whole queue

Crypto Commands

\`.price\` : to get the price of a token or coin based on usd or another coin
Example:
.price btc (shows the price against usd)
.price bnb/btc (shows the price against btc)

\`.live\` : starts a new text channel and updates popular coin prices every 5 minutes in the channel mentioned.

\`.fg\` : Shows fear & greed index of crypto

\`.release\` : Enable/Disable updates release note

\`.contact\` : To contact the developer`

const InviteButton = new MessageButton()
.setLabel('Invite now')
.setStyle('url')
.setURL('https://discord.com/oauth2/authorize?client_id=848571510243590165&permissions=8&scope=bot%20applications.commands')


const Help = new MessageEmbed()
.setTitle("Help & Usage")
.setColor("#150e71")
.setDescription(helptext)
.setFooter("Hope you'd find this bot useful and have fun :)")


/**
 * Used to send a message including contact info
 * @param {Disocrd.Message} msg A recieved message from discord
 */

async function sendContactDetails(msg){
    await msg.reply(ContactUs);
}

/**
 * Used to send a list of commands as help to user
 * @param {Disocrd.Message} msg A recieved message from discord
 */

async function sendHelpMessage(msg){
    await msg.reply(Help, { buttons : InviteButton });
}

module.exports = { sendContactDetails , sendHelpMessage }
