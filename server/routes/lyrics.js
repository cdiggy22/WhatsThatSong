
const express = require("express");
const axios = require("axios");
const { BadRequestError } = require("../expressError");
music = require('musicmatch')({apikey:"0574b1ac6dfc13b973096ef255cfd9c6"});

const router = new express.Router();
const BASEURL = 'https://api.musixmatch.com/ws/1.1/'


//get top 10 closest matching lyrics
router.get("/track/:lyrics", async function (req, res, next) {
    try{
        let result = await axios.get(`${BASEURL}track.search?q_lyrics=${req.params.lyrics}&page_size=10&page=1&f_has_lyrics=1&apikey=0574b1ac6dfc13b973096ef255cfd9c6`);
        let track_list = res.json(result.data.message.body.track_list);
        return track_list;
    } catch(err) {
        return next(err)
    }
    
});

// get current top 10 US tracks 

router.get("/top", async function (req, res, next) {
    try{
        let result = await axios.get(`${BASEURL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=0574b1ac6dfc13b973096ef255cfd9c6`)
        let top_tracks = res.json(result.data.message.body.track_list);
        return top_tracks;
    } catch (err) {
        return next(err)
    }
})

// get lyrics based on track id 

router.get("/lyrics/:track_id", async function (req, res, next) {
    try {
        let result = await axios.get(`${BASEURL}track.lyrics.get?track_id=${req.params.track_id}&apikey=0574b1ac6dfc13b973096ef255cfd9c6`)
        let lyrics_results = res.json(result.data.message.body);
        return lyrics_results
    } catch (err) {
        console.log(err)
        return next(err)
        
    }
})

//top artist by country
router.get("/artists", async function (req, res, next) {
    try{
        let result = await axios.get(`${BASEURL}chart.artists.get?country=us&apikey=0574b1ac6dfc13b973096ef255cfd9c6`)
            res.json(result.data.message.body.artist_list)
    } catch(err) {
        return next(err)
    }
})


module.exports = router;