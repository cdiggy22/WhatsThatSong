import React, {useState, useEffect} from "react";
import LyricsApi from './LyricsApi';
import CardList from "./CardList";
import Search from "./Search";


// List all companies
function Artists(){
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function getArtists (){
            let artists = await LyricsApi.getArtists();
            setArtists(artists);
        }
        getArtists();

    }, [])

    async function searchArtists(search) {
        let artists = await LyricsApi.getArtists(search);
        setArtists(artists);
    }

    return (
        <div className='companies'>
            <CardList cards={artists}/>
            <Search searchTerm={searchArtists} endpoint="artists"/>
        </div>
    )
}

export default Artists;