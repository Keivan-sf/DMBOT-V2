// @ts-check
const { getInputType } = require('../music/input_type');
const getInfo = require('../music/info');
const { errorHandler } = require('../utils/errors.js');
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} input 
 */

async function playMusic(message , input){

    try{

        const type = getInputType(input);
        console.log(type)
        const info = await getInfo(type.input , type.linktype , type.platform , { format : 'dmplayer' , user : message.author });
        console.log(info)

    }catch(err){
         // new Error('#DM02 , There was an internal error finding your song');
         errorHandler(err , message);
    }

}

module.exports = { playMusic };