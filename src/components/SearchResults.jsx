import React from 'react';
import MoviesGrid from './MoviesGrid';
import MovieCard from './MovieCard';

export default function SearchResults({ data, query }) {
  return (
    <MoviesGrid title={`Search results for "${query}"`}>
      {data.length === 0 && (
        <p className="text-white">
          No search results found. Please try again with a different search
          query.
        </p>
      )}
      {data.length > 0 &&
        data.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
    </MoviesGrid>
  );
}
