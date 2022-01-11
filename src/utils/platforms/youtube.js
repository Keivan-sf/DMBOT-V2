// @ts-check
const { Worker } = require('worker_threads')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const PromiseOptions = require('../Promises');


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
        reject('#DM03 , Searching proccess on youtube took too long');
    }
    
    const timerID = setTimeout(rejectAndTerminate , 12000)

    const musicFinder = new Worker('./src/music/worker.js' , { workerData: { query , config } });
    
    musicFinder.once('message' , results => {
        clearTimeout(timerID);
        resolve(JSON.parse(results));
    })
    
    musicFinder.once('error' , err => {
        clearTimeout(timerID);
        reject(err)
    });
    
    
})



const getVideoInfo = async (link) => new Promise(async(resolve, reject) => {

    const promise = new PromiseOptions();

    detectTimeout(promise , 12000 , reject);
 
    ytdl.getInfo(link)
    .then(info => {

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(info)

    })
    .catch((err) => {

        if(!promise.isPending) return;

        promise.setRejected();

        console.log(err)
        
        reject('DM#07 , We could not find the video related to your song');

    })
 
}) 

const getPlaylistInfo = async (link) => new Promise(async(resolve , reject) => {

    const id = getPlaylistID(link);

    /**
     * Used to store promise status in order to handle rejections
     */
    const promise = new PromiseOptions();

    detectTimeout(promise , 12000 , reject);

    ytpl(id)
    .then(info => {

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(info)

    })
    .catch(() => {

        if(!promise.isPending) return;

        promise.setRejected();

        reject('DM#07 , We could not find the playlist related to your link');

    })

})

/**
 * Used to get id from a valid youtube playlsit URL
 * @param {String} link 
 * @returns {String} playlsit id
 */
const getPlaylistID = (link) => {

    let idytpl = link.split("playlist?list=")[1]

    if(idytpl.includes("&")) idytpl = idytpl.split("&")[0];

    idytpl = idytpl.endsWith('/') ? idytpl.split('/').join('') : idytpl;
    
    if(!idytpl) throw new Error('DM#05 , Playlist could not be found');
    return idytpl;
}

/**
 * Used to throw `#DM06` error if the promise is still pending after the given time
 * @example
 * const promiseFunction = new Promise((resolve , reject) => {
 * 
 *      const promise = new PromiseOptions();
 *      
 *      detectTimeout(promise , 1000 , reject);
 *      
 *      new Promise((resolve , reject) => setTimeout(resolve , 3000))
 *      .then(promise.SetResolved)
 *      .catch(promise.setRejected)
 *      
 * })
 * @param {PromiseOptions} promise the promise to be checked
 * @param {Number} ms timeout in ms
 * @param {any} reject Reject function of the parent promise
 * @returns {Promise} Timer ID
 */

const detectTimeout = async(promise , ms , reject) => {
    await sleep(ms);
    if(!promise || promise.isPending) {
        promise.setRejected();
        reject('#DM06 , There was a timeout while requesting to your desired song')
    }
}

/**
 * used to stop the proccess until the given time range has been fulfilled
 * @param {Number} ms timeout in ms
 * @returns {Promise}
 */

const sleep = ms => new Promise((resolve) => setTimeout(resolve , ms));

/**
 * Youtube utilities
 */

const Youtube = {
    search , getVideoInfo , getPlaylistInfo
}

module.exports = Youtube;