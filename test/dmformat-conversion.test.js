const { expect } = require('chai');
const Youtube = require('../src/utils/platforms/youtube');

describe("Youtube" , () => {
    it("keywords" , ()=>{

        const mockValue = {
            videoId: 'tylSM7CGPgY',
            url: 'https://youtube.com/watch?v=tylSM7CGPgY',
            title: 'ivri - collide (Lyrics) prod. tomcbumpz | "1, 2, 3 we will collide"',
            thumbnail: 'https://i.ytimg.com/vi/tylSM7CGPgY/hq720.jpg',
            seconds: 90,
            timestamp: '1:30',
            duration: { seconds: 90, timestamp: '1:30' },
        };

        const results = Youtube.DMFormat.convertFromSearch(mockValue , {id : '510426166277177353'});

        expect(results).to.have.deep.equal({
            url: 'https://youtube.com/watch?v=tylSM7CGPgY',
            title: 'ivri - collide (Lyrics) prod. tomcbumpz | "1, 2, 3 we will collide"',
            duration: { seconds: 90, timestamp: '1:30' },
            thumbnail: 'https://i.ytimg.com/vi/tylSM7CGPgY/hq720.jpg',
            platform: 'YouTube',
            userID: '510426166277177353'
        })

    })

    it("video" , () => {

        const mockValue = {
            videoDetails : {
                title: "Cyberpunk 2077 - Kerry's Song [Audio w/drums]",
                lengthSeconds: '347',
                videoId: 'lW6aspAKy04',
                thumbnail : {
                    thumbnails : [
                        { url: 'https://i.ytimg.com/vi/tylSM7CGPgY/hq720.jpg?sth=sthww2342' }
                    ]
                }
            },
            extraValue: 'extra',
        };

        const expected = {
            url: 'https://www.youtube.com/watch?v=lW6aspAKy04',
            title: "Cyberpunk 2077 - Kerry's Song [Audio w/drums]",
            duration: { seconds: 347, timestamp: '05:47' },
            thumbnail: 'https://i.ytimg.com/vi/tylSM7CGPgY/hq720.jpg',
            platform: 'YouTube',
            userID: '510426166277177353',
        }

        const results = Youtube.DMFormat.convertFromVideo(mockValue , {id : '510426166277177353'});

        expect(results).to.deep.include(expected);
        
    })

    it("playlist" , ()=> {

        const mockValue = {
            url: 'https://www.youtube.com/playlist?list=PLmZaBifpuSc-j4i09hZXxjTKrJUyBd9bd',
            title: 'Wantons Octave',
            thumbnails: [
                {
                  url: 'https://i.ytimg.com/vi/aiw9AQoJVJ8/hqdefault.jpg?sqp=-oaymwtYVvlybDmW1nw68FWobqw',
                  width: 336,
                  height: 188
                },
            ],

            items: [
                {
                  title: 'Octave - "Delam Tang Shode Barat" OFFICIAL AUDIO',
                  index: 1,
                  id: 'aiw9AQoJVJ8',
                  shortUrl: 'https://www.youtube.com/watch?v=aiw9AQoJVJ8',
                  url: 'https://www.youtube.com/watch?v=aiw9AQoJVJ8&list=PLmZaBifpuSc-j4i09hZXxjTKrJUyBd9bd&index=1',
                  author: [Object],
                  thumbnails: [{url : 'https://i.ytimg.com/vi/aiw9AQoJVJ8/hqdefault.jpg?sqp=CLCebCVvlybDmW1nw68FWobqw'}],
                  duration: '3:52',
                  durationSec: 232,
                },
            ]

        }

        const expected = {
            list: {
                url: 'https://www.youtube.com/playlist?list=PLmZaBifpuSc-j4i09hZXxjTKrJUyBd9bd',
                title: 'Wantons Octave',
                tracks_count: 1,
                thumbnail: 'https://i.ytimg.com/vi/aiw9AQoJVJ8/hqdefault.jpg',
                platform: 'YouTube',
                userID: '510426166277177353'
            },
            tracks : [

                {
                    url: 'https://www.youtube.com/watch?v=aiw9AQoJVJ8',
                    title: 'Octave - "Delam Tang Shode Barat" OFFICIAL AUDIO',
                    duration: {seconds: 232 , timestamp: '3:52'},
                    thumbnail: 'https://i.ytimg.com/vi/aiw9AQoJVJ8/hqdefault.jpg',
                    platform: 'YouTube',
                    userID: '510426166277177353'
                },

            ]
        }

        const results = Youtube.DMFormat.convertFromList(mockValue , {id : '510426166277177353'});

        expect(results).to.deep.equal(expected);

    })

})