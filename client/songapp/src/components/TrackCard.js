//Individual Track Song

import React from 'react';
import { Link } from 'react-router-dom';



const TrackCard = (props) => {
    const { track } = props;

    return (
        
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm"> 
                <div className = "card-body">
                    
                    <h3>
                        Track: {track.track_name}
                    </h3>
                    <p>
                        Artist: {track.artist_name}
                    </p>
                    <p>
                        Album: {track.album_name}
                    </p>
                    
                    <Link
                        to={`search/lyrics/${track.track_id}`}
                            className="btn btn-dark btn-block"
                    >
                    <i className="fas fa-chevron-right" /> View Lyrics
                    </Link>

                </div> 
            </div> 
        </div>
        
    )
}
export default TrackCard;