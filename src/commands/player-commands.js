const { getInputType } = require('../music/input_type.js');

function playMusic(message , input){
    const type = getInputType(input);
}

module.exports = { playMusic };