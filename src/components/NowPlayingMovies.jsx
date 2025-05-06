import React, { useEffect, useState } from 'react';
import MoviesGrid from './MoviesGrid';
import MovieCard from './MovieCard';
import { fetchNowPlayingMovies } from '../services/api';

export default function NowPlayingMovies() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getNowPlayingMovies() {
      try {
        const data = await fetchNowPlayingMovies();
        setNowPlayingMovies(data);
      } catch (err) {
        setError(
          err.message ||
            'Something went wrong! Failed to get top rated TV shows.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    getNowPlayingMovies();
  }, []);
  return (
    <MoviesGrid title="Now Playing">
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">{error}</p>}
      {nowPlayingMovies &&
        nowPlayingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
    </MoviesGrid>
  );
}
