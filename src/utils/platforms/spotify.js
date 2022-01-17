const { Spotify } = require("spotify-info.js");
const spotifyInfo = new Spotify({
clientID: process.env.SPOTIFY_ID,
clientSecret: process.env.SPOTIFY_SECRET,
});
const spotify_url_info = require('spotify-url-info')
const { handleInfoPromise } = require('./utils');


const getSongInfo = link => {
    const id = link.split('.com/track/')[1];
    return handleInfoPromise(id , '#DM11' , spotifyInfo , [] , 'getTrack');
}

const getPlaylistInfo = link => 
    handleInfoPromise(link , '#DM12' , spotifyInfo , [] , 'getPlaylistByURL');

const getAlbumInfo = link => 
    handleInfoPromise(link , '#DM13' , spotifyInfo , [] , 'getAlbumByURL');

const getArtistInfo = link =>
    handleInfoPromise(link , '#DM14' , spotify_url_info , [] , 'getData');

module.exports = { getSongInfo , getPlaylistInfo , getAlbumInfo , getArtistInfo}