import React, {useState} from "react";


function Search ({searchFor}){
    const [search, setSearch] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      searchFor(search);
    }
  
    function handleChange(e) {
      setSearch(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" onChange={handleChange} value={search} placeholder="search here"></input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
  
}

export default Search;