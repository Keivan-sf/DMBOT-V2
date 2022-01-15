const scs = require("soundcloud-scraper");
const SOUND_CLOUD_KEY = process.env.SOUNDCLOUD_SECRET;
const scScraper = new scs.Client(SOUND_CLOUD_KEY);
const scDownloader = require('../../../modified_modules/soundcloud-downloader/index').default;
const { handleInfoPromise } = require('./utils');

const getPlaylistInfo = link => 
    handleInfoPromise(link , '#DM08' , scDownloader , 'getSetInfo')



const getSongInfo = link => 
    handleInfoPromise(link , '#DM10' , scDownloader , 'getInfo')


module.exports = { getPlaylistInfo , getSongInfo }