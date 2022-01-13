//@ts-check
const expect = require('chai').expect;
const Youtube = require('../src/utils/platforms/youtube')

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

})