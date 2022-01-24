//@ts-check

const { MessageEmbed, Message } = require('discord.js');
const error_list = require('../../errors.json');
const error_codes = Object.keys(error_list);
const supportID = 'Keivan#7981';
const embed_color = `#${process.env.PRIMIRY_COLOR}`;

/**
 * If an internal error occurres this embed will be used as an error message
 */
const internal_error_embed = new MessageEmbed()
.setColor(embed_color)
.setDescription(`
**Internal error**
An internal error has occurred, please contact \`${supportID}\` for more information
`)


/**
 * Used to handle errors and check if an error is predicted or not
 * 
 * Checks if the `error` or `error.message` is a supported error code in `errors.json` **keys**, then takes one of the actions below:
 * - If supported , it will send a message containing the error value provided in `errors.json`
 * - If not, it will send an internal error embed
 * @param {Error} error An internal error
 * @param {Message} message Discord client message
 */

module.exports.errorHandler = (error , message) => {

    const errorCode = error.message ? error.message : error;

    console.log(`my errro code here : ${errorCode}`)

    const definedErrorCode = error_codes.find(errcode => errcode === errorCode);

    if(!definedErrorCode){
        if(!message) return;
        message.channel.send(internal_error_embed).catch(() => console.log('failed to send an internal error message'));
        console.log(error);
        return;
    }

    const embed = buildErrorEmbed(definedErrorCode);

    message.channel.send(embed).catch(() => console.log('failed to send a defined error message'));

}

/**
 * Used to create an error embed in order to be sent to the client
 * 
 * The embed will be created based on the **error code** and **the value of the error code** provided in `errors.json`
 * @param {String} errorCode 
 * @returns {MessageEmbed}
 */

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