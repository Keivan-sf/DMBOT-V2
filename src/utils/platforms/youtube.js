// @ts-check
const { Worker } = require('worker_threads')
const ytdl = require('ytdl-core')


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

    const musicFinder = new Worker('./src/music/worker.js' , { workerData: { query , config } });

    let hasResponded = false;
    
    musicFinder.once('message' , results => {
        hasResponded = true;
        resolve(JSON.parse(results));
    })
    
    musicFinder.once('error' , err => {
        reject(err)
        hasResponded = true;
    });
    
    const rejectAndTerminate = () => {
        if(hasResponded) return;
        musicFinder.terminate().catch(err => console.log('Error terminating a wasted worker' , err))
        reject('#DM03 , Searching proccess on youtube took too long');
    }
    
    setTimeout(rejectAndTerminate , 12000)
    
})



const getVideoInfo = async (link) => {
    console.log('here')
    const info = await ytdl.getInfo(link);
    return info;
}


/**
 * Youtube utilities
 */

const Youtube = {
    search , getVideoInfo
}

module.exports = Youtube;