//@ts-check

const { MessageEmbed } = require('discord.js');
const error_list = require('../../errors.json');
const error_codes = Object.keys(error_list);
const supportID = 'Keivan#7981';
const embed_color = `#${process.env.PRIMIRY_COLOR}`;

const internal_error_embed = new MessageEmbed()
.setColor(embed_color)
.setDescription(`
**Internal error**
An internal error has occurred, please contact \`${supportID}\` for more information
`)


/**
 * 
 * @param {*} error 
 * @param {*} message 
 */

module.exports.errorHandler = (error , message) => {

    const definedErrorCode = error_codes.find(errcode => errcode === error);

    if(!definedErrorCode){
        if(!message) return;
        message.channel.send(internal_error_embed).catch(() => console.log('failed to send an internal error message'));
        console.log(error);
        return;
    }

    const embed = buildErrorEmbed(definedErrorCode);

    message.channel.send(embed).catch(() => console.log('failed to send a defined error message'));

}

const buildErrorEmbed = errorCode =>{

    const error_embed = new MessageEmbed()
    .setDescription(`
    **${error_list[errorCode]} 😥**

    Error code \`${errorCode}\`

    If this is unexpected, please contact \`${supportID}\`
    `)
    .setColor(embed_color);

    return error_embed;

}