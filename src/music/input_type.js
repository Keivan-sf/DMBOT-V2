const ytdl = require('ytdl-core')
const rjdl = require('node-rjdl')

const validRjTypes = [
  'song',
  'playList',
  'video',
  'podcast',
  'album'
]

const protocols = ['https' , 'http']

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



function getInputType(target){
  const URL_DETECTED = detectURLs(target);
  if(URL_DETECTED?.length < 1) return {type : 'keywords'};
  let input = URL_DETECTED[0];
  input = input.endsWith('/') ? input :  input + '/';
  const generalType = getGeneralType(input);
  const details = getDetailedType(input , generalType);
  console.log(generalType , details);
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

const getDetailedType = (link , platform) => {
  let defualtType = {type : 'keywords'};

  switch(platform.name){
    case 'spotify':
      return matchIndentifiers(link , platform);

    case 'deadmoments':
      return matchIndentifiers(link , platform);

    case 'youtube':
      if(ytdl.validateURL(link)) return {platform: 'youtube' , type: 'video'};
      return matchIndentifiers(link , platform);

    case 'keywords':
      return {type : 'keywords'};

    case 'soundcloud':
      if(link.includes('/sets/')) return {platform: 'soundcloud' , type: 'set'};
      if(link.endsWith('soundcloud.com/')) return defualtType;
      const args = link.split("soundcloud.com/")[1];
      const argsArray = args.split('/');
      if(argsArray[1]) return {platform: 'soundcloud' , type: 'song'};
      return {platform: 'soundcloud' , type: 'artist'};

    case 'radiojavan':
      let type = rjdl.type(link);
      if(type) return{platform: 'radiojavan' , type};
      return defualtType;
  }
}

const matchIndentifiers = (link , platform) => {
  let linkType = platform.types.find(type => link.includes(type.indentifier));
  if(!linkType) return defualtType;
  return {
    platform : platform.name,
    type : linkType.type
  }
}

const detectURLs = text => 
  text.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g);


const validateRjArg = type => validRjTypes.some(rjType => rjType === type);
  
function getYoutubeID(input){
    var id = input;
    if(input.includes("youtu.be/")){
        id = input.split("youtu.be/")[1];
        if(id.includes("?")){
            id = id.split["?"][0];
        }
        if(id.includes("&")){
            id = id.split["&"][0];
        }
    }else if(input.includes("v=")){
        id= input.split("v=")[1];
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
