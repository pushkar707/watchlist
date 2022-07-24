import React,{useEffect,useRef} from 'react'
import Movie from "./Movie";
import { useGlobalContext } from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

function SearchResults({type}) {
    const {data,found,fetchMoreData,favorites,setfavorites,copyFavs} = useGlobalContext();
    const results = useRef("");
    const movies = useRef("");
    const next = useRef("");

    useEffect(()=>{
        if(movies.current){
            if(movies.current.offsetWidth > results.current.scrollWidth-10){
                next.current.style.display = 'none';
            }
            else{
                next.current.style.display = 'initial';
            }
        }
    },[data])
    if(found && type=="search"){
        return <>
        <h3 style={{marginLeft:'30px',marginBottom:'10px',textTransform:"capitalize",color:'#f9085fb0'}}>Search Results</h3>
        <div className="movies" ref={movies}>

            <div className="results" ref={results}>
                {data.map((item) => {
                    return <Movie {...item} key={item.imdbID} type="notAdded"/>
                })}
            </div>    
            <img onClick={fetchMoreData} ref={next} src="https://www.pinclipart.com/picdir/big/130-1304531_inspiration-red-arrow-clip-art-medium-size-small.png" alt="" className="next"/>
        </div>
        </>;
    }else if(type == 'Watch List'){
        return <>
        <div className='fav-head'>
            <div style={{display:'flex'}}>
                <h3 style={{textTransform:"capitalize",color:'#f9085fb0'}}>{type}</h3>
                <h4 className='copy-btn' onClick={copyFavs}><FontAwesomeIcon icon={faCopy} /></h4>
            </div>
            <button onClick={()=>setfavorites([])}>Remove all</button>
        </div>
        <div className="fovorites">
            {favorites.map((item) => {
                return <Movie {...item} key={item.imdbID} type="added"/>
            })}
        </div>
        </>;
    }
    else{
        return <h3><center>No results found</center></h3>
    }
}

export default SearchResults