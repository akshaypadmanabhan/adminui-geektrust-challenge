import React from 'react'

import "./SearchBar.css"

function SearchBar(props) {
  return (
    <input
        className="search-bar"
        type="text"
        name="name"
        placeholder=" Search by any field "
        onChange={props.onChange}
      />
  )
}

export default SearchBar