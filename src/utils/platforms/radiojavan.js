const rjdl = require('node-rjdl');
const { handleInfoPromise } = require('./utils');

const validateRjArg = type => {

    const validRjTypes = [
        'song',
        'playList',
        'video',
        'podcast',
        'album'
      ]

    return validRjTypes.some(rjType => rjType === type);

}

const getInfo = async(link) => 
    handleInfoPromise(link, '#DM15' , rjdl , [] , 'getInfo');



module.exports = { getInfo , validateRjArg };