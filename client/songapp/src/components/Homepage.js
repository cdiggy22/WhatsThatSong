import React, {useContext} from "react";
// import Context from './Context';
import UserContext from ".././UserContext";
import CardList from "./CardList";
import TopTracks from "./TopTracks";


function Home() {
  const {user} = useContext(UserContext);

  return (
    <div class="jumbotron jumbotron-fluid">
         <div class="container">
           {!user ?
              <div>
                <h1 class="display-4">What's That Song</h1>
                <p class="lead">Find and save your favorite tracks here </p> 
              </div>
            :
              <h1 class="display-4">Find and save your favorie tracks here </h1>
            }
        </div>
        <TopTracks/>
    </div>    
    
  );
}

export default Home;