// @ts-check
const Youtube = require('../utils/platforms/youtube');
const SoundCloud = require('../utils/platforms/soundcloud');
const Spotify = require('../utils/platforms/spotify');

/**
 * Gathers information about a __text input__ or a __link__
 * 
 * If the input is simple text it'll search youtube
 * 
 * __Supported links__
 *  - Youtube  `video` `playlist` `channel` `user`
 *  - Spotify `song` `playlist` `album` `user` `artist`
 *  - Soundcloud `song` `set` `artist`
 *  - RadioJavan `song` `playlist` `album` `podcast` `video` `artist`
 *  - Deadmoments `playlist`
 * 
 * @param {String} input __link__ or __text__ to gather info from
 * @param {String} [type] link type (*Will be ignored if `input` is text*)
 * @param {String} [platform] link platform (*__Leave empty__ if `input` is text*)
 * @param {Object} [options] Info gathering options
 * @param {Boolean} [options.firstResult] __Defult : true__ , Only provides the first item of the text search *(Good for performance)* 
 * @param {Boolean} [options.videoOnly] __Defult : true__ , Only provides the video results of text search *(if false, There can be channels , playlsit etc.)*
 * @param {"normal"|"dmplayer"} [options.format] __Defult : `normal`__, Provides Deadmoments player friendly object if set to `dmplayer`
 * @returns {Promise<Array|Object>}
 */

async function getInfo(input , type , platform , options = {firstResult : true , videoOnly: true , format: 'normal'}){

    const config = {
        firstResult : setValue(options.firstResult , true),
        videoOnly : setValue(options.videoOnly , true)
    }

    if(!platform) return Youtube.search(input , config);

    const getLinkInfo = {

        "youtube" : {
            "video" : Youtube.getVideoInfo,
            "playlist" : Youtube.getPlaylistInfo,
        },

        "soundcloud" : {
            "song" : SoundCloud.getSongInfo,
            "set" : SoundCloud.getPlaylistInfo,
          //  "artist" ...   to be developed
        },

        "spotify" : {
            "song" : Spotify.getSongInfo,
            "playlist" : Spotify.getPlaylistInfo,
            "album" : Spotify.getAlbumInfo,
            "artist" : Spotify.getArtistInfo,
        }
        
    }

    console.log(`platform : ${platform} , type : ${type}`);

    return getLinkInfo[platform][type](input);

}






const setValue = (value , defualt) => value !== undefined ? value : defualt;

module.exports = getInfo;