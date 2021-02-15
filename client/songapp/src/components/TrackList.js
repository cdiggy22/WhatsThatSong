import React, { useState } from 'react';
// import { Context } from '../../context';
import Track from "../components/Tracks";





const TrackList = () => {
    // const [state] = useContext(Context);
    const [track_list, setTrack_List] = useState([]);
        return (
            <>
                <h3 className="text-center mb-4">Tracks</h3>
                <div className="row">
                
                 {track_list.length === 0 ? 
                    <p> Sorry, No results</p> 
                    : track_list.forEach(item => {
                    <div>
                        <p>Track:</p>
                        <Track key={item.track.track_id} track={item.track} />
                    </div>
                     console.log(item.track.track_name)
                    })};           
                </div>
            </>
        )
    
}

export default TrackList;