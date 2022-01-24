// @ts-check

const { User } = require('discord.js');
const { Worker } = require('worker_threads')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const { handleInfoPromise , numberToTimestamp} = require('./utils')


/**
 * @typedef {{url: String , title: String , duration:{seconds: Number , timestamp: String} , thumbnail: String , platform: String , userID : String , playFromInfo?}} DM_TRACK
 */

/**
 * @typedef DM_PLAYLIST
 * @prop {{url: String , title: String , tracks_count: Number , thumbnail: String , platform: String , userID : String}} list
 * @prop {Array<DM_TRACK>} tracks
 */


/**
* Used to search youtube with a provided query
* @param {String} query 
* @param {Object} [config] Info gathering options
* @param {Boolean} [config.firstResult] __Defult : true__ , Only provides the first item of the text search *(Good for performance)* 
* @param {Boolean} [config.videoOnly] __Defult : true__ , Only provides the video results of text search *(if false, There can be channels , playlsit etc.)*
* @returns {Promise<Array|Object>}
*/

const search = (query , config = {firstResult : true , videoOnly: true}) => new Promise((resolve , reject) => {

    const rejectAndTerminate = () => {
        musicFinder.terminate().catch(err => console.log('Error terminating a wasted worker' , err))
        reject('#DM03');
    }
    
    const timerID = setTimeout(rejectAndTerminate , 12000)

    const musicFinder = new Worker('./src/utils/platforms/youtube-search-worker.js' , { workerData: { query , config } });
    
    musicFinder.once('message' , results => {
        clearTimeout(timerID);
        const parsed = JSON.parse(results);
        if(parsed.error) return reject(parsed.error);
        resolve(parsed);
    })
    
    musicFinder.once('error' , err => {
        clearTimeout(timerID);
        reject(err)
    });
    
    
})



const getVideoInfo =  (link) =>
    handleInfoPromise(link , '#DM09' , ytdl , [] , 'getInfo');
 


const getPlaylistInfo = (link) => {
    const id = getPlaylistID(link);
    return handleInfoPromise(id , '#DM07' , ytpl);
}

/**
 * Used to get id from a valid youtube playlsit URL
 * @param {String} link 
 * @returns {String} playlsit id
 */

function getPlaylistID(link){

    let idytpl = link.split("playlist?list=")[1]

    if(idytpl.includes("&")) idytpl = idytpl.split("&")[0];

    idytpl = idytpl.endsWith('/') ? idytpl.split('/').join('') : idytpl;
    
    if(!idytpl) throw new Error('#DM05');
    return idytpl;
}

/**
 * Used to convert normal youtube info formats into `dmplayer` friendly formatted object
 */

const DMFormat = {

    convertFromSearch,

    convertFromVideo,

    convertFromList,

}


/**
 * Converts YouTube's first search result into a `DM_TRACK` object
 * @param {Object} info 
 * @param {User} user 
 * @returns {DM_TRACK}
 */


function convertFromSearch(info , user){

    const platform = 'YouTube';
    const userID = user.id;

    const url = info.url;
    const title = info.title;
    const duration = { seconds : info.seconds , timestamp : info.timestamp };
    const thumbnail = info.thumbnail;

    return {url , title , duration , thumbnail , platform , userID};
    
}

/**
 * Converts a YouTube video into a `DM_TRACK` object
 * @param {Object} info 
 * @param {User} user 
 * @returns {DM_TRACK}
 */


function convertFromVideo(info , user){

    const platform = 'YouTube';
    const userID = user.id;

    const videoDetails = info.videoDetails;

    const url = "https://www.youtube.com/watch?v=" + videoDetails.videoId;

    const title = videoDetails.title;

    const duration_in_seconds = +videoDetails.lengthSeconds;

    const duration = { seconds: duration_in_seconds , timestamp : numberToTimestamp.convert(duration_in_seconds)};

    let thumbnail = videoDetails.thumbnail?.thumbnails?.[0]?.url;

    thumbnail = thumbnail ? thumbnail.split('?')[0] : null;

    return {url , title , duration , thumbnail , platform , userID , playFromInfo: info}

}

/**
 * Converts a YouTube playlist into a `DM_PLAYLIST` object
 * @param {Object} info 
 * @param {User} user 
 * @returns {DM_PLAYLIST}
 */


function convertFromList(info , user){

    const platform = 'YouTube';
    const userID = user.id;

    const list = {
        url : info.url,
        title : info.title,
        tracks_count : info.items.length,
        thumbnail: info.thumbnails.slice(-1)?.[0].url?.split('?')[0],
        platform,
        userID
    }

    let tracks = [];

    for(const item of info.items){

        const url = item.shortUrl;

        const title = item.title;

        const duration = { seconds: item.durationSec , timestamp: item.duration ?? numberToTimestamp.convert(item.durationSec) };

        const thumbnail = item.thumbnails?.slice(-1)?.[0].url?.split('?')[0];

        tracks.push({url , title , duration , thumbnail , platform , userID})

    }

    return { list , tracks };

}


/**
 * Youtube utilities
 */

const Youtube = {
    search , getVideoInfo , getPlaylistInfo , DMFormat
}

module.exports = Youtube;