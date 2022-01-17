const expect = require('chai').expect;
const Youtube = require('../src/utils/platforms/youtube')
const SoundCloud = require('../src/utils/platforms/soundcloud');
const Spotify = require('../src/utils/platforms/spotify');

jest.setTimeout(10000)

describe("Music info" , () => {

    describe("Youtube" , () => {

        it("video" , async() => {
            const results = await Youtube.getVideoInfo('https://www.youtube.com/watch?v=s6sdy20_QMM');
            expect(results).to.have.deep.property('full' , true);
        })

        it("playlist" , async() => {
            const results = await Youtube.getPlaylistInfo('https://www.youtube.com/playlist?list=PLKUaRuWWzUbdgUtop982voGsQF9h1P4jy');
            expect(results).to.have.deep.property('title' , 'Wantons');
        })

    })

    describe("Soundcloud" , () => {

        it("playlist" , async() => {
            const result = await SoundCloud.getPlaylistInfo("https://soundcloud.com/user-692461400/sets/lofi?si=5033faf325ed4b1f99adc846adea3e60&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing");
            expect(result).to.have.deep.property('created_at' , '2017-03-08T04:03:46Z');
        })

        it("song" , async() => {
            const result = await SoundCloud.getSongInfo("https://soundcloud.com/user-942528866/xxxtentacion-numb-everybody-dies-in-their-nightmares-mashup-cover");
            expect(result).to.have.deep.property('created_at' , '2018-03-25T06:05:42Z');
        })

    })

    describe("Spotify" , () => {

        it("song" , async () => {
            const result = await Spotify.getSongInfo("https://open.spotify.com/track/3sVlvHkFjyIrU8qeejurdP?si=cafdbd1b0bb74208");
            expect(result).to.have.deep.property('name' , 'Imagination');
        })

        it("playlist" , async() => {
            const result = await Spotify.getPlaylistInfo("https://open.spotify.com/playlist/1lVm0OD4KbjEcxzjxP99vN");
            expect(result).to.have.deep.property('uri' , 'spotify:playlist:1lVm0OD4KbjEcxzjxP99vN')
        })

        it("album" , async() => {
            const result = await Spotify.getAlbumInfo("https://open.spotify.com/album/47BiFcV59TQi2s9SkBo2pb");
            expect(result).to.have.deep.property('release_date' , '2010-06-18');
        })

        it("artist" , async() => {
            const result = await Spotify.getArtistInfo("https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR?si=da3308f8ed8a4f77");
            expect(result).to.have.deep.property('dominantColor' , '#535353');
        })

    })

})