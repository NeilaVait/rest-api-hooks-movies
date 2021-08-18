import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await axios.get('https://swapi.dev/api/films/');
    console.log(response.data.results);
    //perdaryti duomenis i mum reikalinga struktura
    const moviesTranformed = response.data.results.map((m) => {
      return { id: m.episode_id, title: m.title, openingText: m.opening_crawl, releaseDate: m.realease_date };
    });
    setMovies(moviesTranformed);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button disabled={isLoading} onClick={fetchMoviesHandler}>
          {isLoading ? 'Loading' : 'Fetch Movies'}
        </button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies at the moment</p>}
        {isLoading && <p>Loading movies...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
