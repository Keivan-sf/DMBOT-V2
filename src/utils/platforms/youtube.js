// @ts-check
const { Worker } = require('worker_threads')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const PromiseOptions = require('../PromiseOptions');
const { handleInfoPromise } = require('./utils')

/**
* Used to search youtube with a provided query
* @param {String} query 
* @param {Object} [config] Info gathering options
* @param {Boolean} [config.firstResult] __Defult : true__ , Only provides the first item of the text search *(Good for performance)* 
* @param {Boolean} [config.videoOnly] __Defult : true__ , Only provides the video results of text search *(if false, There can be channels , playlsit etc.)*
* @param {"normal"|"dmplayer"} [config.format]
* @returns {Promise<Array|Object>}
*/

const search = (query , config = {firstResult : true , videoOnly: true , format : 'normal'}) => new Promise((resolve , reject) => {

    const rejectAndTerminate = () => {
        musicFinder.terminate().catch(err => console.log('Error terminating a wasted worker' , err))
        reject('#DM03');
    }
    
    const timerID = setTimeout(rejectAndTerminate , 12000)

    const musicFinder = new Worker('./src/music/worker.js' , { workerData: { query , config } });
    
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
const getPlaylistID = (link) => {

    let idytpl = link.split("playlist?list=")[1]

    if(idytpl.includes("&")) idytpl = idytpl.split("&")[0];

    idytpl = idytpl.endsWith('/') ? idytpl.split('/').join('') : idytpl;
    
    if(!idytpl) throw new Error('#DM05');
    return idytpl;
}

/**
 * Youtube utilities
 */

const Youtube = {
    search , getVideoInfo , getPlaylistInfo
}

module.exports = Youtube;