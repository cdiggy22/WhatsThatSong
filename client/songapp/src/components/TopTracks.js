import React, { useState, useEffect } from "react";
// import CardList from "./CardList";
// import Search from "./Search";
import LyricsApi from "./LyricsApi";
import TrackCard from "./TrackCard";



function TopTracks (){
    const [toptracks, setTopTracks] = useState([]);

    useEffect(() => {
        async function getTracks() {
            let toptracks = await LyricsApi.topTracks();
            setTopTracks(toptracks);
            console.log(toptracks);
            // console.log(toptracks);
        }
        getTracks();
        console.log(toptracks)
    }, [])


    return(
        <div>
           
            <h2>Results</h2>
            {toptracks.length ? toptracks.forEach(item =>{
                <div>
                    <h1>Top 10 Tracks</h1>
                   <TrackCard key={item.track.track_id} track={item.track} />
                </div>
            } ) : <p>Sorry No Results</p>}
          
        </div>
    );


}

export default TopTracks;