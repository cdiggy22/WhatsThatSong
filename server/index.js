const express = require('express');
const app = express();
const port = 3001;



music = require('musicmatch')({apikey:"0574b1ac6dfc13b973096ef255cfd9c6"});

// app.get('/api/track/:lyrics', (req, res) => {
//   const request = unirest("GET", `https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=${req.params.lyrics}&f_has_lyrics=1&quorum_factor=1&page_size=10&apikey=0574b1ac6dfc13b973096ef255cfd9c6`);
// //   request.query({ "q_lyrics": req.params.lyrics,
// //                 "f_has_lyrics": 1,
// // });
// //   request.headers({
// //     "format": "jsonp",
// //     "callback": "callback"
    

// //   });

//   request.end(function (response) {
//     if (response.error) throw new Error(response.error);
//     console.log(response.body.callback.body.track_list);
//     res.json(response.body || {});
//   });

// });

app.get('/api/track/:lyrics', (req, res) => {
    music.trackSearch({q_lyrics: req.params.lyrics, page:1, page_size:10, f_has_lyrics: 1})
    .then(function(data){
        console.log(data);
        res.json(data.message.body.track_list);
        
    })
    .catch(function(err){
        console.log(err);
    })
});

app.listen(port, () => {
  console.log(`WhatsThatSong listening at http://localhost:${port}`);
});