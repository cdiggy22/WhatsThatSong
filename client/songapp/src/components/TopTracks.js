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
            
        }
        getTracks();
    }, [])

   const userTracks = toptracks.map( (item) => {
    const response =  ( <div>
         {/* <h1>Top 10 Tracks</h1> */}
        <TrackCard key={item.track.track_id} track={item.track} />
     </div>)
     
     return response;
     } )

    return(
        <div>
           
            <h2>Today's Top Ten Tracks</h2>
            {toptracks.length > 0 ? <div>{userTracks}</div> : <p>Sorry No Results</p>}
         
        </div>
    );


}

export default TopTracks;