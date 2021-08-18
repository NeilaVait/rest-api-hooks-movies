import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieError, setMovieError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setMovieError(false);
    try {
      const response = await axios.get('https://swapi.dev/api/films/');

      //perdaryti duomenis i mum reikalinga struktura
      const moviesTranformed = response.data.results.map((m) => {
        return { id: m.episode_id, title: m.title, openingText: m.opening_crawl, releaseDate: m.realease_date };
      });

      setMovies(moviesTranformed);
    } catch (err) {
      setMovieError(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const showContent = () => {
    if (!isLoading && movies.length > 0) return <MoviesList movies={movies} />;
    if (movieError) return <p>{movieError}</p>;
    if (!isLoading && movies.length === 0 && !movieError) return <p>No movies at the moment</p>;
    if (isLoading) return <p>Loading movies...</p>;
  };

  return (
    <React.Fragment>
      <section>
        <button disabled={isLoading} onClick={fetchMoviesHandler}>
          {isLoading ? 'Loading' : 'Fetch Movies'}
        </button>
      </section>
      <section>{showContent()}</section>
    </React.Fragment>
  );
}

export default App;
