const {workerData , parentPort} = require('worker_threads');
const ytSearch = require('yt-search');

search();

async function search(){

    const results = await ytSearch(workerData.query);

    if(results.all.length < 1) throw new Error('#DM01 , No song has been found for the given keyword in youtube');

    const filtered = workerData.config.videoOnly ? results.all.filter(item => item.type === 'video') : results.all;

    if(filtered.length < 1) throw new Error('#DM01 , No song has been found for the given keyword in youtube');

    if(workerData.config.firstResult) parentPort.postMessage(JSON.stringify(filtered[0]));
    
    parentPort.postMessage(JSON.stringify(filtered));

}