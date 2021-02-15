import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { decode } from "jsonwebtoken";
import useLocalStorage from "./hooks/LocalStorage";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import LyricsApi from "../src/components/LyricsApi";
import Home from "./components/Homepage";
import UserContext from "./UserContext";

export const TOKEN_STORAGE_ID = "lyrics-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function retrieveUser() {
      try{
        let { username } = decode(token);
        let currentUser = await LyricsApi.getCurrentUser(username);
        setCurrentUser(currentUser)
      } catch (e) {
        setCurrentUser(null);
      }
      setInfoLoaded(true)
    
    }
    setInfoLoaded(false)
    retrieveUser();
  }, [token])

  const handleLogOut = () => {
    setCurrentUser('noToken');
    setToken(null);
  };

  if(!infoLoaded) {
    return "Loading...."
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, handleLogOut }}>
        <div className="App">
          <Navbar logout={handleLogOut}>
          
          </Navbar>
          <Routes setToken={token}></Routes>
         
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
