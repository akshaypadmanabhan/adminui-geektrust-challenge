import React from 'react'
import "./Search.css"

function SearchBar() {
  return (
    <div>
     <input className="search-bar" type="text" placeholder='Search By Name,Email or Role' />
     <button className="search-btn">Search</button>
    </div>
  )
}

export default SearchBar