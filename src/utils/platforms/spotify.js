const { Spotify } = require("spotify-info.js");
const spotifyInfo = new Spotify({
clientID: process.env.SPOTIFY_ID,
clientSecret: process.env.SPOTIFY_SECRET,
});
const { getData, getPreview, getTracks} = require('spotify-url-info')
const { handleInfoPromise } = require('./utils');


const getSongInfo = link => {
    const id = link.split('.com/track/')[1];
    return handleInfoPromise(id , '#DM11' , spotifyInfo , 'getTrack');
}

const getPlaylistInfo = link => {
    return handleInfoPromise(link , '#DM12' , spotifyInfo , 'getPlaylistByURL');
}

module.exports = { getSongInfo , getPlaylistInfo }