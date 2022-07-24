import React from 'react'
import { useGlobalContext } from '../context'
import AddFavorite from './AddFavorites';
import RemoveFavorites from './RemoveFavorites';

function Movie({Title,imdbID,Poster,type}) {
  const {addTofavorite,removeFromfavorite} = useGlobalContext();

  if(type=="notAdded"){
    return (
      <div className='movie'>
        <div className='image-container d-flex justify-content-start'>
          <img src={Poster} alt="Title" />
          <div
						onClick={() => addTofavorite(imdbID)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<AddFavorite/>
					</div>
        </div>
          <p>{Title}</p>
      </div>
    )
  }else{
    return (
      <div className='movie'>
          <div className='image-container d-flex justify-content-start'>
            <img src={Poster} alt="Title" />
            <div
              onClick={() => removeFromfavorite(imdbID)}
              className='overlay d-flex align-items-center justify-content-center'
            >
              <RemoveFavorites/>
            </div>
        </div>
        <p>{Title}</p>
      </div>
      
    )
  }
}

export default Movie