import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import React,{useEffect} from "react";
import Head from "./components/Head";
import SearchResults from "./components/SearchResults";
import { useGlobalContext } from './context';

function App() {
  const {setfavorites} = useGlobalContext();
  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setfavorites(movieFavourites);
		}
	}, []);
  return (
    <div>
      <Head/>
      <SearchResults type="search" />
      <SearchResults type="Watch List" />
    </div>
  );
}

export default App;