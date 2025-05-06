import React, { useEffect, useState } from 'react';
import MoviesGrid from './MoviesGrid';
import MovieCard from './MovieCard';
import { fetchTrendingMovies } from '../services/api';

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (err) {
        setError(
          err.message || 'Something went wrong! Failed to get trending movies.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    getTrendingMovies();
  }, []);
  return (
    <MoviesGrid title="Trending Movies">
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">{error}</p>}
      {trendingMovies &&
        trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </MoviesGrid>
  );
}
