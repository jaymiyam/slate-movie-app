import React, { useEffect, useState } from 'react';
import MoviesGrid from './MoviesGrid';
import MovieCard from './MovieCard';
import { fetchUpcomingMovies } from '../services/api';

export default function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getUpcomingMovies() {
      try {
        const data = await fetchUpcomingMovies();
        setUpcomingMovies(data);
      } catch (err) {
        setError(
          err.message ||
            'Something went wrong! Failed to get trending TV shows.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    getUpcomingMovies();
  }, []);
  return (
    <MoviesGrid title="Upcoming">
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">{error}</p>}
      {upcomingMovies &&
        upcomingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
    </MoviesGrid>
  );
}
