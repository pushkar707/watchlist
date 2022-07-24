import React, { useEffect } from 'react'
import { useGlobalContext } from '../context';

function Head() {
    const {search, setsearch} = useGlobalContext();    
  return (
    <div className='head'>        
        <h2>Movies</h2>
        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search for movies/series"/>
    </div>
  )
}

export default Head