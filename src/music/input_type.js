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
        indentifier : 'playlist?list='
      },
      {
        type : 'channel',
        indentifier : '/channel/'
      },
      {
        type : 'channel',
        indentifier : '/c/'
      },
      {
        type : 'user',
        indentifier : '/user/'
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
        indentifier : '/track/'
      },
      {
        type : 'playlist',
        indentifier : '/playlist/'
      },
      {
        type : 'album',
        indentifier : '/album/'
      },
      {
        type : 'artist',
        indentifier : '/artist/'
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
        indentifier: '&count='
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
 * @returns 
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
      return matchIndentifiers(link , platform);

    case 'deadmoments':
      return matchIndentifiers(link , platform);

    case 'youtube':
      if(ytdl.validateURL(link)) return {platform: 'youtube' , linktype: 'video' , input : link};
      return matchIndentifiers(link , platform);

    case 'keywords':
      return defualtType;

    case 'soundcloud':
      if (ytdl.validateURLlink.includes('/sets/')) return {platform: 'soundcloud' , linktype: 'set' , input : link};
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

// here  ,  document this !

const matchIndentifiers = (link , platform) => {
  let linkType = platform.types.find(type => link.includes(type.indentifier));
  if (!linkType) return defualtType;
  return {
    platform : platform.name,
    type : linkType.type,
    input : link
  }
}


/**
 * Detecs URLs in a text
 * @param {String} text 
 */

const detectURLs = text => 
  text.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g);


/**
 * Validates whether provided radiojavan type is supported or not
 * @param {String} type Type to be checked
 */
const validateRjArg = type => validRjTypes.some(rjType => rjType === type);


/**
 * Gets youtube ID from a valid youtube video url
 * @param {String} url A valid video url from youtube
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
