import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Search from "./Search";
import LyricsApi from "./LyricsApi";


function Tracks (){
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function getTracks() {
            let res = await LyricsApi.getTracks();
            setTracks(res)
        }
        getTracks();
    }, [])
    
    const search = async (search) => {
        let res = await LyricsApi.getTracks(search);
        setTracks(res)
    }

    useEffect(() => {
        search();
    }, []);

    return(
        <div>
            <h1>Tracks</h1>
            <Search searchFor={search} />
            <CardList res={tracks} />
        </div>
    );


}

export default Tracks;