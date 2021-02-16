import React, { useState, useEffect } from "react";
// import CardList from "./CardList";
// import Search from "./Search";
import LyricsApi from "./LyricsApi";


function Lyrics (){
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        async function getLyrics() {
            let lyrics = await LyricsApi.getLyrics();
            setLyrics(lyrics.lyrics_body)
        }
        getLyrics();
        
    }, [])
    
    const search = async (track_id) => {
        let lyrics = await LyricsApi.getLyrics(track_id);
        setLyrics(lyrics)
        console.log(lyrics)
    }

    useEffect(() => {
        search();
    }, []);

    return (
        
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm"> 
                <div className = "card-body">
                    
                    <h3>
                        Lyrics: {lyrics.lyrics_body}
                    </h3>
                    
                
                    <button>Back Home</button>
                </div> 
            </div> 
        </div>
        
    )


}

export default Lyrics;