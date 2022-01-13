//@ts-check
const expect = require("chai").expect;
const type = require('../src/music/input_type')

describe('Input type tests' , function(){


   
    describe('Youtube' , () => {


      it('video type' , () => {

        const results = type.getInputType('https://www.youtube.com/watch?v=EyFJKKLUudc');

        const expected = {
          platform: 'youtube',
          linktype: 'video',
          input: 'https://www.youtube.com/watch?v=EyFJKKLUudc/'
        }

        expect(results).to.deep.equal(expected)

      })


      it('playlist type' , () => {

        const results = type.getInputType('https://www.youtube.com/playlist?list=PLBOkTyRBa1FpCwBcQzFLfwbwOe685ZQFU');

        const expected = {
          platform: 'youtube',
          linktype: 'playlist',
          input: 'https://www.youtube.com/playlist?list=PLBOkTyRBa1FpCwBcQzFLfwbwOe685ZQFU/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('channel type with /channel/' , () => {

        const results = type.getInputType('https://www.youtube.com/channel/UCSJ4gkVC6NrvII8umztf0Ow/');

        const expected = {
          platform: 'youtube',
          linktype: 'channel',
          input: 'https://www.youtube.com/channel/UCSJ4gkVC6NrvII8umztf0Ow/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('channel type with /c/' , () => {

        const results = type.getInputType('https://www.youtube.com/c/JamesBartholomewMusic');

        const expected = {
          platform: 'youtube',
          linktype: 'channel',
          input: 'https://www.youtube.com/c/JamesBartholomewMusic/'
        }

        expect(results).to.deep.equal(expected)

      })


      it('user type' , () => {

        const results = type.getInputType('https://www.youtube.com/user/radiojavan');

        const expected = {
          platform: 'youtube',
          linktype: 'user',
          input: 'https://www.youtube.com/user/radiojavan/'
        }

        expect(results).to.deep.equal(expected)

      })



    })

    

    describe('Spotify' , () => {


      it('track type' , () => {

        const results = type.getInputType('https://open.spotify.com/track/7A0T4eb6jPhhQp3KQis6ww?si=d94d8d1c812e48fd');

        const expected = {
          platform: 'spotify',
          linktype: 'track',
          input: 'https://open.spotify.com/track/7A0T4eb6jPhhQp3KQis6ww?si=d94d8d1c812e48fd/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('playlist type' , () => {

        const results = type.getInputType('open.spotify.com/playlist/0azLv76jYZRJlW3OEGCzqm/');

        const expected = {
          platform: 'spotify',
          linktype: 'playlist',
          input: 'https://open.spotify.com/playlist/0azLv76jYZRJlW3OEGCzqm/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('album type' , () => {

        const results = type.getInputType('http://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH');

        const expected = {
          platform: 'spotify',
          linktype: 'album',
          input: 'http://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('artist type' , () => {

        const results = type.getInputType('https://open.spotify.com/artist/5GZtFXR3XBoZlaoI9lTmDp?si=fcd8e6aa8c164cd2');

        const expected = {
          platform: 'spotify',
          linktype: 'artist',
          input: 'https://open.spotify.com/artist/5GZtFXR3XBoZlaoI9lTmDp?si=fcd8e6aa8c164cd2/'
        }

        expect(results).to.deep.equal(expected)

      })
      
      it('user type' , () => {

        const results = type.getInputType('https://open.spotify.com/user/yails?si=5d34af1688a64e9a');

        const expected = {
          platform: 'spotify',
          linktype: 'user',
          input: 'https://open.spotify.com/user/yails?si=5d34af1688a64e9a/'
        }

        expect(results).to.deep.equal(expected)

      })


    })


    describe('Soundcloud' , () => {


      it('song' , () => {

        const results = type.getInputType('www.soundcloud.com/user-942528866/xxxtentacion-numb-everybody-dies-in-their-nightmares-mashup-cover');

        const expected = {
          platform: 'soundcloud',
          linktype: 'song',
          input: 'https://www.soundcloud.com/user-942528866/xxxtentacion-numb-everybody-dies-in-their-nightmares-mashup-cover/'
        }

        expect(results).to.deep.equal(expected)

      })

      it('set -> album' , () => {

        const results = type.getInputType('http://soundcloud.com/anthonyangouleme/sets/love');

        const expected = {
          platform: 'soundcloud',
          linktype: 'set',
          input: 'http://soundcloud.com/anthonyangouleme/sets/love/'
        }

        expect(results).to.deep.equal(expected)
        
      })

      it('set -> playlist' , () => {

        const results = type.getInputType('soundcloud.com/user-782861696/sets/i-love-acoustic-covers');

        const expected = {
          platform: 'soundcloud',
          linktype: 'set',
          input: 'https://soundcloud.com/user-782861696/sets/i-love-acoustic-covers/'
        }

        expect(results).to.deep.equal(expected)
        
      })

      it('artist' , () => {

        const results = type.getInputType('http://soundcloud.com/eminemofficial/');

        const expected = {
          platform: 'soundcloud',
          linktype: 'artist',
          input: 'http://soundcloud.com/eminemofficial/'
        }

        expect(results).to.deep.equal(expected)
        
      })


    })

    describe('RadioJavan' , () => {


      it('song' , () => {

        const results = type.getInputType('https://www.radiojavan.com/mp3s/album/Zedbazi-Zakhar-Nameh?index=3');

        const expected = {
          platform: 'radiojavan',
          linktype: 'song',
          input: 'https://www.radiojavan.com/mp3s/album/Zedbazi-Zakhar-Nameh?index=3/'
        }

        expect(results).to.deep.equal(expected);

      })

      it('playlist' , () => {

        const results = type.getInputType('https://www.radiojavan.com/playlists/playlist/mp3/edfd3097c9cc/');

        const expected = {
          platform: 'radiojavan',
          linktype: 'playList',
          input: 'https://www.radiojavan.com/playlists/playlist/mp3/edfd3097c9cc/'
        }

        expect(results).to.deep.equal(expected);

      })

      it('video' , () => {

        const results = type.getInputType('http://www.radiojavan.com/videos/video/anita-live-in-istanbul-2021');

        const expected = {
          platform: 'radiojavan',
          linktype: 'video',
          input: 'http://www.radiojavan.com/videos/video/anita-live-in-istanbul-2021/'
        }

        expect(results).to.deep.equal(expected);
        
      })

      it('podcast' , () => {

        const results = type.getInputType('https://www.radiojavan.com/podcasts/podcast/Didare-Jaan-40');

        const expected = {
          platform: 'radiojavan',
          linktype: 'podcast',
          input: 'https://www.radiojavan.com/podcasts/podcast/Didare-Jaan-40/'
        }

        expect(results).to.deep.equal(expected);
        
      })

      it('album' , () => {

        const results = type.getInputType('https://www.radiojavan.com/mp3s/album/Alireza-JJ-Sijal-Nassim-Pir-Shodim-Vali-Bozorg-Na-Vol-2');

        const expected = {
          platform: 'radiojavan',
          linktype: 'album',
          input: 'https://www.radiojavan.com/mp3s/album/Alireza-JJ-Sijal-Nassim-Pir-Shodim-Vali-Bozorg-Na-Vol-2/'
        }

        expect(results).to.deep.equal(expected);
        
      })

    })


    describe('Deadmoments' , () => {

      it('playlist' , () => {

        const results = type.getInputType('https://deadmoments.com/playlist.php?id=510426166277177354&count=5');

        const expected = {
          platform: 'deadmoments',
          linktype: 'playlist',
          input: 'https://deadmoments.com/playlist.php?id=510426166277177354&count=5/'
        }

        expect(results).to.deep.equal(expected);

      })

    })


    it('Keyword' , () => {

      const results = type.getInputType('Some text here dude!');

      const expected = {
        platform: null,
        linktype: 'keywords',
        input: 'Some text here dude!'
      }

      expect(results).to.deep.equal(expected);

    })

    
})