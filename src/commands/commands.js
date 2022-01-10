// @ts-check
const staticMessage = require('./staticTexts');
const Discord = require('discord.js')
const player_commands = require('./player-commands.js')

const Prefix = '.';


const commands = {

    static : {
        'fg': () => console.log('fg'),
        'play' : () => console.log('play'),
        'pause' : () => console.log('pause'),
        'stop' : () => console.log('stop'),
        'resume' : () => console.log('resume'),
        'skip' : () => console.log('skip'),
        'next' : () => console.log('next'),
        'n' : () => console.log('n'),
        'repeat' : () => console.log('repeat'),
        'loop' : () => console.log('loop'),
        'clear' : () => console.log('celar'),
        'c' : () => console.log('c'),
        'disconnect' : () => console.log('disconnect'),
        'dc' : () => console.log('dc'),
        'playlist' : () => console.log('playlist'),
        'help' : staticMessage.sendHelpMessage, // done
        'finish' : () => console.log('finish'),
        'save' : () => console.log('save'),
        'np' : () => console.log('np'),
        'lq' : () => console.log('lq'),
        'looq' : () => console.log('looq'),
        'suggestions': () => console.log('suggestions'),
        'suggestion': () => console.log('suggestions'),
        'autoplay': () => console.log('autoplay'),
        'sg': () => console.log('sg'),
        'release' : () => console.log('release'),
        'contact' : staticMessage.sendContactDetails, // done
    },

    query : {

        'price' : () => console.log('qprice'),
        'play' : player_commands.playMusic,
        'p' : () => console.log('qp'),
        'search' : () => console.log('qsearch'),
        'name' : () => console.log('qname'),
        'add' : () => console.log('qadd'),
        'save' : () => console.log('qsave'),
        'chart' : () => console.log('qchart'),
        'tech' : () => console.log('qtech'),
    },

}

const commandList = {
    static : Object.keys(commands.static),
    query : Object.keys(commands.query),
}

/**
 * Used to handle a message and run a command if provided
 * @param {Discord.Message} msg A recieved message from discord
 */

const handleMessage = async msg =>{

    if(!msg.content?.startsWith(Prefix)) return;

    const content = msg.content.replace(Prefix , '');

    if(content.includes(' ')){
        await handleQueryCommand(content , msg).catch(err => console.log('error handling the command : ' , err))
    }else{
        await handleStaticCommand(content , msg).catch(err => console.log('error handling the command : ' , err))
    }

}

/**
 * Used to handle static commands (without query)
 * 
 * such as `disconnect` , `dc` , `fg` , ...
 * @param {String} content Message content without prefix
 * @param {Discord.Message} message A recieved message from discord
 */

const handleStaticCommand = async (content , message) => {
    const contentLowerCase = content.toLowerCase();
    const command = commandList.static.find(value => contentLowerCase === value);
    if(command) await commands.static[command](message);
}

/**
 * Used to handle query included commands
 * 
 * such as `play <Keyword|Link>` , `search <Keyword>`
 * @param {*} content Message content without prefix
 * @param {*} message A recieved message from discord
 */

const handleQueryCommand = async (content , message) => {
    const args = content.split(' ');
    const commandLowerCase = args[0].toLowerCase();
    let command = commandList.query.find(value => commandLowerCase === value);
    if(command){
        args.shift();
        const query = deleteUnnecessarySpaces(args.join(' '));
        await commands.query[command](message , query);
    }
}

/**
 * Used to remove unnecessary spaces before actual text/query
 * Example: 
 * 
 * ```js
 * deleteUnnecessarySpaces("   This text has some unused spaces!");
 * // output : "This text has some unused spaces!"
 * ```
 * @param {String} str 
 */

function deleteUnnecessarySpaces(str){
    let text = str.split('');
    let textLength = text.length;
    for(let i = 0; i < textLength; i++){
        if(!(text[i] === ' ')) break;
        delete text[i];
    }
    return text.join('');
}

module.exports = { handleMessage };