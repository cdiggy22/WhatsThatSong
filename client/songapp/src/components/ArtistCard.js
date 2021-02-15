import React from "react";
import {Link} from "react-router-dom";

 function ArtistCard({details={} }){
    const { name, country,  artist_id } = details;

    return (
        <Link className = "Card card" to={`/artists/${artist_id}`}>
            <div>
                <h4>{name}</h4>
                <h6>{country}</h6>
            </div>
           

        </Link>
    )
 }

 export default ArtistCard;