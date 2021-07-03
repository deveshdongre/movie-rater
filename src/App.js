import './App.css';
import React, { useState , useEffect } from 'react';
// import axios from 'axios'
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieFrom from './components/movie-form';
import {useCookies} from 'react-cookie';



function App() {
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovies] = useState(null);
  const [ editedMovie, setEditedMovie] = useState(null);
  const [token,setToken] = useCookies(['mr-token']);
  


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/",{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token['mr-token']}`
      }
    }
    )
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  },[]) 

  useEffect( () => {
    if(!token['mr-token']) window.location.href = '/';
 },[token])

 
  const loadMovie = movie => {
    setSelectedMovies(movie);
    setEditedMovie(null);
  }
  const editClicked = movie =>{
    setEditedMovie(movie);
    setSelectedMovies(null);

  }
  const updateMovie = movie =>{
    const newMovies = movies.map( mov => {
      if(mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({title:'',description:''});
    setSelectedMovies(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies); 
  }
  const removeClicked = movie =>{
    const newMovies = movies.filter(mov => {
      if (mov.id === movie.id){
        return false;
      }
      return true;
    })
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header> 
      <div className="Layout">
        <div>
          < MovieList 
          movies={movies} 
          movieClicked={loadMovie} 
          editClicked={editClicked}
          removeClicked={removeClicked}
          />
          <button onClick={ newMovie }>New Movie</button>
        </div>
        < MovieDetails  movie={selectedMovie} updateMovie={loadMovie}/>
        {editedMovie ? 
          <MovieFrom movie={editedMovie} updateMovie={updateMovie} movieCreated={movieCreated}/> 
        : null }
      </div>
    </div>
  );
}

export default App;
