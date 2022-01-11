//@ts-check
const { Worker } = require('worker_threads')
const ytdl = require('ytdl-core')

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
 * @param {String} [type] link type (*will be ignored if `input` is text*)
 * @param {String} [platform] link platform (*Leave empty if `input` is text*)
 * @param {Object} options Info gathering options
 * @param {Boolean} options.firstResult __Defult : true__ , Only provides the first item of the text search *(Good for performance)* 
 * @param {Boolean} options.videoOnly __Defult : true__ , Only provides the video results of text search *(if false, There can be channels , playlsit etc.)*
 * @returns {Promise<Array|Object>}
 */

async function getInfo(input , type , platform , options = {firstResult : true , videoOnly: true}){

    const config = {
        firstResult : setValue(options.firstResult , true),
        videoOnly : setValue(options.videoOnly , true)
    }

    if(!platform) return searchYouTube(input , config);

    

}

/**
 * Used to search youtube with a provided query
 * @param {String} query 
 * @param {Object} config Info gathering options
 * @param {Boolean} config.firstResult __Defult : true__ , Only provides the first item of the text search *(Good for performance)* 
 * @param {Boolean} config.videoOnly __Defult : true__ , Only provides the video results of text search *(if false, There can be channels , playlsit etc.)*
 * @returns {Promise<Array|Object>}
 */

const searchYouTube = (query , config = {firstResult : true , videoOnly: true}) => new Promise((resolve , reject) => {

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



const setValue = (value , defualt) => value !== undefined ? value : defualt;

module.exports = getInfo;