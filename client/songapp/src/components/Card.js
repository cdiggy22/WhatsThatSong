import React from "react";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";

function Card({ details = {}}) {
  //check if details have a handle to determine if its a company card
    if (details.track_id) {
    return <TrackCard details={details} />;
  } else {
    return <ArtistCard details={details} />;
  }
}

export default Card;
