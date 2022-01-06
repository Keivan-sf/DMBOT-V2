const { getType } = require('../music/input_type.js');

function playMusic(message , input){
    const type = getType(input);
    message.reply(type.join(' / '))
}

module.exports = { playMusic };