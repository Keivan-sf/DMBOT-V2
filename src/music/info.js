// @ts-check
const Youtube = require('../utils/platforms/youtube');
const SoundCloud = require('../utils/platforms/soundcloud');
const Spotify = require('../utils/platforms/spotify');
const RadioJavan = require('../utils/platforms/radiojavan');
const { User } = require('discord.js');

/**
 * Gathers information about a __text input__ or a __link__
 * 
 * If input is a simple text it'll search youtube
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
 * @param {User} [options.user] If `options.format` is set to `dmplayer` , a discord user object is needed to provide the song asker tag
 * @returns {Promise<Array|Object>}
 */

async function getInfo(input , type , platform , options = {firstResult : true , videoOnly: true , format: 'normal' , user: null}){

    if(options.firstResult == false && !platform && options.format === 'dmplayer')
        throw new Error(`Cannot convert multiple search results into "dmplayer" format >> 'options.firstResult = false' & 'options.format = "dmplayer"' cannot be used togather`);

    if(options.format === 'dmplayer' && !options.user)
        throw new Error(`A user must be provided in 'optoins.user' in order to create "dmplayer" format`);

    if(options.videoOnly == false && options.format == 'dmplayer')
        throw new Error(`Cannot convert non-video results into "dmplayer" format >> 'options.videoOnly = false' & 'options.format = "dmplayer"' cannot be used togather`);

    const config = {
        firstResult : setValue(options.firstResult , true),
        videoOnly : setValue(options.videoOnly , true)
    }

    if(!platform) {

        const info = await Youtube.search(input , config);

        if(options.format !== 'dmplayer') return info;

        const dmFriendly = Youtube.DMFormat.convertFromSearch(info , options.user);

        return dmFriendly;

    }

    /**
     * `rjdl.getInfo` accepts all types of links, therefore type of the link doesn't matter when platform is `radiojavan`
     */

    const linktype = platform != 'radiojavan' ? type : "any";

    console.log(`platform : ${platform} , type : ${type}`);

    // throws error if the platform is supported, but the link type is not

    if(!getLinkInfo[platform][linktype] || typeof getLinkInfo[platform][linktype] != 'function') throw new Error('#DM16');

    const info = await getLinkInfo[platform][linktype](input);

    // returns normal formatted info if the 'options.format' is not 'dmplayer'

    if(options.format !== 'dmplayer') return info;

    return convert_to_dm_friendly[platform][type](info , options.user);

}

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
    },

    "radiojavan" : {
        "any" : RadioJavan.getInfo,
    }
    
}

const convert_to_dm_friendly = {
    "youtube" : {
        "video" : Youtube.DMFormat.convertFromVideo,
        "playlist" : Youtube.DMFormat.convertFromList,
    },
}


const setValue = (value , defualt) => value !== undefined ? value : defualt;

module.exports = getInfo;