import React,{useContext,useEffect,useState} from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [search, setsearch] = useState('avengers');
    const [data, setdata] = useState([])
    const [found, setFound] = useState(false);
    const [favorites, setfavorites] = useState([]);
    const [page, setpage] = useState(1)
    const url = `http://www.omdbapi.com/?s=${search}&page=${page}&apikey=1bc41cc`
    
    const addTofavorite = async(imdbID) => {
      const movie = favorites.find((item)=>{
        return item.imdbID == imdbID;
      })
      if(!movie){
        const link = `http://www.omdbapi.com/?i=${imdbID}&apikey=1bc41cc`;
        const res = await fetch(link);
        const data = await res.json();
        setfavorites([data,...favorites])
        saveToLocalStorage([data,...favorites]);
      }
    }

    const removeFromfavorite = async(imdbID) => {
        const link = `http://www.omdbapi.com/?i=${imdbID}&apikey=1bc41cc`;
        const res = await fetch(link);
        const data = await res.json();
        const newMovies = favorites.filter((item)=>{
          if(item.imdbID != imdbID){
            return item;
          }
        })
        setfavorites(newMovies)
        saveToLocalStorage(newMovies)
    }

    const fetchData = async() => {
      setpage(1);
      const res = await fetch(url);
      const result = await res.json()
      if(result.Response == 'True'){
        setdata([...result.Search]);
        setFound(true);
      }else{
        setFound(false);
      }
    }

    const fetchMoreData = async() =>{
      console.log('running');
      setpage(page+1);
      if(page!=1){
        const res = await fetch(url);
        const result = await res.json();
        console.log(result.Search);
        if(result.Response == 'True'){
          setdata([...data,...result.Search])
        }
      }
    }

    const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };

    const copyFavs = () => {
      console.log(favorites);
      let text = ''
      var copyDiv = document.createElement('div');  
      favorites.map((item,index)=>{
        copyDiv.innerHTML += `${index+1}. ${item.Title}<br>`;
      })
      copyDiv.contentEditable = true;
      document.body.appendChild(copyDiv);
      copyDiv.unselectable = "off";
      copyDiv.focus();
      document.execCommand('SelectAll');
      document.execCommand("Copy", false, null);
      document.body.removeChild(copyDiv);
    }

    useEffect(()=>{        
        fetchData();
    },[search])
    
    return(
        <AppContext.Provider value={{search,setsearch,data,found,addTofavorite,removeFromfavorite,favorites,fetchMoreData,setfavorites,saveToLocalStorage,copyFavs}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider}