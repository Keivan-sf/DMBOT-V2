
/**
 * @typedef {Object} PlatformsType
 * @prop {String} type Type name, *example* `video` `playlist` `user` `song` `album` , ...
 * @prop {String} identifire URL identifire, *example* `/channel/` , `/artist/` , `playlist?list=` , ...
 */

/**
 * @typedef {Object} Platform
 * @prop {String} name Platform's name
 * @prop {String[]} addresses Platform's supported addresses
 * @prop {Array<PlatformsType>} types
 */



const ytdl = require('ytdl-core')
const rjdl = require('node-rjdl')

const validRjTypes = [
  'song',
  'playList',
  'video',
  'podcast',
  'album'
]

const protocols = ['https' , 'http'];

const types = [
  {
    name :'youtube',
    addresses : [
      'youtube.com',
      'youtu.be'
    ],
    types : [
      {
        type : 'playlist',
        identifire : 'playlist?list='
      },
      {
        type : 'channel',
        identifire : '/channel/'
      },
      {
        type : 'channel',
        identifire : '/c/'
      },
      {
        type : 'user',
        identifire : '/user/'
      },
    ]
  },

  {
    name :'spotify',
    addresses : [
      'open.spotify.com',
    ],
    types : [
      {
        type : 'track',
        identifire : '/track/'
      },
      {
        type : 'playlist',
        identifire : '/playlist/'
      },
      {
        type : 'album',
        identifire : '/album/'
      },
      {
        type : 'artist',
        identifire : '/artist/'
      },
    ]
  },

  {
    name: 'soundcloud',
    addresses : ['soundcloud.com']
  },

  {
    name: 'deadmoments',
    addresses : ['deadmoments.com/playlist.php?id='],
    types: [
      {
        type : 'playlist',
        identifire: '&count='
      }
    ]
  },

  {
    name: 'radiojavan',
    addresses: ['radiojavan.com' , 'rjapp.app']
  },

]

/**
 * @typedef {{platform: String , input: String , linktype: String}} type
 */

/**
 * 
 * @param {String} target 
 * @returns {type}
 */

function getInputType(target){
  const URL_DETECTED = detectURLs(target);
  if(!URL_DETECTED || URL_DETECTED.length < 1) return {linktype : 'keywords' , input : target , platform: null};
  let input = URL_DETECTED[0];
  input = input.endsWith('/') ? input :  input + '/';
  const generalType = getGeneralType(input);
  const details = getDetailedType(input , generalType);
  return details;
}

/**
 * @param {String} input 
 */

const getGeneralType = input => {
  const isAddressIncluded = (address) => {
    return protocols.some(port => {
      const isIncluded = input.includes(`${port}://${address}`) || input.includes(`${port}://www.${address}`);
      return isIncluded;
    });
  }

  let type = types.find(platform => platform.addresses.some(isAddressIncluded));
  return type ? type : {name : 'keywords'};
}

/**
 * 
 * @param {String} link 
 * @param {Object} platform 
 * @returns {type}
 */

const getDetailedType = (link , platform) => {
  let defualtType = {linktype : 'keywords' , input : link};

  switch(platform.name){
    case 'spotify':
      return matchidentifires(link , platform);

    case 'deadmoments':
      return matchidentifires(link , platform);

    case 'youtube':
      if(ytdl.validateURL(link)) return {platform: 'youtube' , linktype: 'video' , input : link};
      return matchidentifires(link , platform);

    case 'keywords':
      return defualtType;

    case 'soundcloud':
      if (link.includes('/sets/')) return {platform: 'soundcloud' , linktype: 'set' , input : link};
      if (link.endsWith('soundcloud.com/')) return defualtType;
      const args = link.split("soundcloud.com/")[1];
      const argsArray = args.split('/');
      if (argsArray[1]) return {platform: 'soundcloud' , linktype: 'song' , input : link};
      return {platform: 'soundcloud' , linktype: 'artist' , input : link};

    case 'radiojavan':
      let type = rjdl.type(link);
      if(type) return{platform: 'radiojavan' , linktype : type , input : link};
      return defualtType;
  }
}

/**
 * Used to chack all of a platfrom URL identifires and find out the type of it
 * 
 * __Note:__ This function only checks the standards provided in {@link types} varable
 * @param {String} link 
 * @param {types} platform 
 */

const matchidentifires = (link , platform) => {
  let linkType = platform.types.find(type => link.includes(type.identifire));
  if (!linkType) return defualtType;
  return {
    platform : platform.name,
    type : linkType.type,
    input : link
  }
}


/**
 * Used to detect URLs in a text
 * @param {String} text
 * @returns {RegExpMatchArray} An array of founded URLs *(Empty if not a single url has been found)*
 */

const detectURLs = text => 
  text.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g);


/**
 * Used to validate whether provided RadioJavan type is supported or not
 * @param {String} type Type to be checked
 */
const validateRjArg = type => validRjTypes.some(rjType => rjType === type);


/**
 * Used to get youtube ID from a valid youtube video url
 * @param {String} url A valid video url from youtube
 * @returns {String} Youtube id
 */
function getYoutubeID(url){
    let id = url;
    if(url.includes("youtu.be/")){
        id = url.split("youtu.be/")[1];
        if(id.includes("?")){
            id = id.split["?"][0];
        }
        if(id.includes("&")){
            id = id.split["&"][0];
        }
    }else if(url.includes("v=")){
        id= url.split("v=")[1];
        if(id.includes("&")){
            id = id.split("&")[0];
        }
        if(id.includes("?")){
            id = id.split["?"][0];
        }
    }
    return id;
}
  

module.exports = {getInputType , getYoutubeID , validateRjArg}
