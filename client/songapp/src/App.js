// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useCallback} from "react";
import Track from './components/Track';
// import axios from "axios";

function App() {
  const [lyrics, setLyrics] = useState('');
  const [track_list, setTrack_List] = useState([]);


  const getTracks = () => {
    fetch('/api/track/' + lyrics, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(result => result.json())
    .then(body => setTrack_List(body))

  };


  return (
    <div className="app">
      <h1>What's That Song</h1>
      <input value={lyrics} onChange={e => setLyrics(e.target.value)} />
      <button onClick={getTracks}>Find Tracks</button>
    
      {track_list.length === 0 ? 
      <p> Sorry, No results</p> 
       : track_list.forEach(item => {
       <div>
          <p>Track:</p>
          {/* <Track key={item.track.track_id} track={item.track} /> */}
        </div>
        console.log(item.track.track_name)
      })}


    </div>
  );
}

export default App;
