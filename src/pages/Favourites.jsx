import React from 'react';
import BigMoviesGrid from '../components/BigMoviesGrid';
import { useFavouritesContext } from '../contexts/FavouritesContext';
import MovieCard from '../components/MovieCard';

export default function Favourites() {
  const { favourites } = useFavouritesContext();
  return (
    <section>
      <div className="w-full text-center px-8 py-10 bg-[url(/image-favourites-hero-bg.png)]">
        <h1 className="font-display text-4xl md:text-5xl text-white text-balance uppercase px-4">
          Your Favourites
        </h1>
      </div>
      <div className="min-h-screen py-10">
        {favourites.length > 0 ? (
          <BigMoviesGrid>
            {favourites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isBig />
            ))}
          </BigMoviesGrid>
        ) : (
          <div className="h-screen text-center">
            <p className="text-white text-2xl font-display">
              No favourites yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
