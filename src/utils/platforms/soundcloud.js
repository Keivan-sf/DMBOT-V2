const scs = require("soundcloud-scraper");
const SOUND_CLOUD_KEY = process.env.SOUNDCLOUD_SECRET;
const scScraper = new scs.Client(SOUND_CLOUD_KEY);
const scDownloader = require('soundcloud-downloader').default;
const PromiseOptions = require('../Promises');
const { detectTimeout } = require("../request");

const getPlaylsitInfo = link => new Promise((resolve , reject) => {

    const promise = new PromiseOptions();

    detectTimeout(promise , 12000 , '#DM06' , reject);

    scDownloader.getSetInfo(link).then(playlist => {

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(playlist);

    }).catch(() => {

        if(!promise.isPending) return;

        promise.setRejected();

        reject('#DM08');

    })

});

module.exports = { getPlaylsitInfo }