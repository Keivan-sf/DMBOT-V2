const ytdl = require('ytdl-core')
const rjdl = require('node-rjdl')

let validRjTypes = [
  'song',
  'playList',
  'video',
  'podcast',
  'album'
]

/**
 * A module to get user's input type
 * @param {String} userInput 
 * @returns __1st__ arg is the platform and the __2nd__ arg the type 
 * 
 * Example: `['soundcloud' , 'sets']`
 */

function getType(userInput){
  let typeOf = ['simple' , null];
  if( ( userInput.includes("playlist?list=") || userInput.includes("/channel/") || userInput.includes("/user/") ) && (userInput.startsWith("https://youtube.com/") || userInput.startsWith("https://www.youtube.com/") || userInput.startsWith("http://www.youtube.com/") ||  userInput.startsWith("http://youtube.com/") || userInput.startsWith("youtube.com/") || userInput.startsWith("www.youtube.com/") || userInput.startsWith("youtu.be/") ||  userInput.startsWith("www.youtu.be/"))){
          if(userInput.includes("playlist?list=")){
              typeOf = ['ytpl' , 'playlist']
          }else if(userInput.includes("/channel/")){
              typeOf = ['ytpl' , 'channel']
          }else if(userInput.includes("/user/")){
              typeOf = ['ytpl' , 'user']
          }
    }else if(ytdl.validateURL(userInput)){
      typeOf = ['validateYTDL' , null]
    }else if(userInput.startsWith("https://soundcloud.com/")){
      typeOf[0] = 'soundCloud';
        if(userInput.includes("/sets/")){
          typeOf[1] = 'sets';
        }else if(userInput != "https://soundcloud.com/"){
          if(userInput.split("soundcloud.com/")[1].includes("/")){
            var securl = userInput.split("soundcloud.com/")[1];
            if(securl.split("/")[1] == null || securl.split("/")[1] == ""){
              typeOf[1] = 'artist';
            }else{
              typeOf[1] = 'simple';
            }
          }else{
            typeOf[1] = 'artist';
          }
        }else{
          typeOf[1] = null;
        }
    }else if(userInput.startsWith("https://open.spotify.com")){
        if(userInput.startsWith("https://open.spotify.com/track/")){
          typeOf = ['spotify' , 'track']
        }else if(userInput.startsWith("https://open.spotify.com/playlist/")){
          typeOf = ['spotify' , 'playlist']
        }else if(userInput.startsWith("https://open.spotify.com/album/")){
          typeOf = ['spotify' , 'album']
        }else if(userInput.startsWith("https://open.spotify.com/artist/")){
          typeOf = ['spotify' , 'artist']
        }
    }else if(userInput.startsWith("https://www.radiojavan.com/")){
      let secArg = rjdl.type(userInput);
      typeOf = ['RadioJavan' , secArg]
    }else if(userInput.startsWith('https://deadmoments.com/playlist.php?id=') && userInput.includes('&count=')){
      typeOf = ['DeadMoments' , 'playlist']
    }else{
      // simple txt
    }
  
    return typeOf;
}

function validateRjArg(type){
    for(var i=0; i< validRjTypes.length; i++){
      if(type == validRjTypes[i]) return true;
    }
    return false;
  }
  
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
  

module.exports = {getType , getYoutubeID , validateRjArg}
