import React, { useState } from 'react';
// import { Context } from '../../context';
import Track from "../components/Track";




const Tracks = () => {
    // const [state] = useContext(Context);
    const [track_list, setTrack_List] = useState([]);
        return (
            <>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
                ))}
                
                </div>
            </>
            // <Consumer>
            //     {value => {
            //         console.log(value);
            //         return <h1>Tracks Listed</h1>
            //     }}
            // </Consumer>
               
        )
    
}

export default Tracks;