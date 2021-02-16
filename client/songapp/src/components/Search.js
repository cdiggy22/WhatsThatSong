import React, {useState, useEffect} from "react";
import LyricsApi from "./LyricsApi";


const Search = () => {
  const [userInput, setUserInput] = useState("");
  // const [trackTitle, setTrackTitle] = useState("");
  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    async function searchLyrics (lyrics) {
      let trackList = await LyricsApi.lyricSearch(lyrics);
        setTrackList(trackList)
    }
    searchLyrics(trackList);
  }, [])

  const findTrack = e => {
    e.preventDefault();
    setUserInput(userInput);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Get Tracks
        </button>
      </form>
    </div>
  );
};

export default Search;