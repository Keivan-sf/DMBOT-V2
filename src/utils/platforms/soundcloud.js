const scs = require("soundcloud-scraper");
const SOUND_CLOUD_KEY = process.env.SOUNDCLOUD_SECRET;
const scScraper = new scs.Client(SOUND_CLOUD_KEY);
const scDownloader = require('../../../modified_modules/soundcloud-downloader/index').default;
const PromiseOptions = require('../Promises');

const getPlaylistInfo = link => 
    handleInfoPromise(link , scDownloader , 'getSetInfo' , '#DM08')



const getSongInfo = async link => 
    await handleInfoPromise(link , scDownloader , 'getInfo' , '#DM10')


const handleInfoPromise = (link , cl , method , error_code) => new Promise((resolve , reject) => {

    const promise = new PromiseOptions();
    promise.autoReject(12000 , '#DM06' , reject);

    cl[method](link).then(info => {

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(info);

    }).catch(() => {
        
        if(!promise.isPending) return;

        promise.setRejected();

        reject(error_code);

    })

}) 

module.exports = { getPlaylistInfo , getSongInfo }