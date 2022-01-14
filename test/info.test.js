const expect = require('chai').expect;
const Youtube = require('../src/utils/platforms/youtube')
const SoundCloud = require('../src/utils/platforms/soundcloud');
//const jest = require('jest');


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
            const result = await SoundCloud.getPlaylsitInfo("https://soundcloud.com/user-692461400/sets/lofi?si=5033faf325ed4b1f99adc846adea3e60&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing");
            expect(result).to.have.deep.property('created_at' , '2017-03-08T04:03:46Z');
        })

    })

})