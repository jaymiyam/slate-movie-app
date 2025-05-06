import { useState, useEffect } from 'react';
import { fetchTopRatedMovies } from '../services/api';
import MoviesGrid from './MoviesGrid';
import MovieCard from './MovieCard';

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTopRatedMovies();
        setTopRatedMovies(data);
      } catch (err) {
        setError(
          err.message || 'Something went wrong! Failed to get top rated movies.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    getTrendingMovies();
  }, []);
  return (
    <MoviesGrid title="Top Rated">
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">{error}</p>}
      {topRatedMovies &&
        topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
    </MoviesGrid>
  );
}
