import React, {useState, useEffect, useContext} from "react";
import LyricsApi from './LyricsApi';
import CardList from "./CardList";
import TrackCard from './TrackCard';
import { useParams, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

function ArtistID (){
    const {searchTerm } = useParams();
   
    const [artist, setArtist] = useState(null);
    const {user} = useContext(UserContext)

    useEffect (() => {
        async function getArtistById(){
            const artist = await LyricsApi.getArtist(searchTerm);
            setArtist(artist);
        }
        getArtistById();
    }, [searchTerm])

    if (!user) return <Redirect to="/login" />

    const showTracks = () => (
      artist.tracks.map(job => (
        <TrackCard key={track.track_id} track={track} />
      ))
    );
  

    // async function apply(idx) {
    //     if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
    //       let jobId = company.jobs[idx].id;
    //       let msg = await JoblyApi.applyToJob(jobId);


    //       setCompany(c => {
    //         let newCompany = { ...c };
    //         newCompany.jobs = newCompany.jobs.map(job =>
    //           job.id === jobId ? { ...job, state: msg } : job
    //         );
    //         return newCompany;
    //       });
    //     }
    // }

    return (
    
        <div className='Artists'>
            <h5>{artist.name}</h5>
            <p>{artist.country}</p>
            {showTracks()}
            <CardList cards={artist.tracks} />
        </div>

    )
}

export default ArtistID;