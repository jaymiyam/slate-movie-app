import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFavouritesContext } from '../contexts/FavouritesContext';

export default function MovieCard({ movie, isBig = false }) {
  const { checkIsFavourite, addToFavourites, removeFavourite } =
    useFavouritesContext();
  const isFavourite = checkIsFavourite(movie.id);
  let navigate = useNavigate();

  function favouriteClick(e) {
    e.stopPropagation();
    if (isFavourite) {
      removeFavourite(movie.id);
    } else {
      addToFavourites(movie);
    }
  }

  return (
    <article
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
      className={`relative h-auto overflow-hidden cursor-pointer shrink-0 ${
        isBig ? 'w-[200px]' : 'w-[160px]'
      }`}
    >
      <div className="relative">
        <img
          className="block object-cover w-full h-full rounded-md"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `src/assets/image-poster-placeholder.png`
          }
          alt={movie.title}
        />
        <button
          onClick={(e) => favouriteClick(e)}
          className={`absolute top-4 right-4 cursor-pointer hover:scale-115 ${
            isFavourite ? 'text-red-500' : 'text-white'
          }`}
        >
          <Icon icon="mdi:heart" width="24" height="24" />
        </button>
      </div>
      <div className="py-2 text-white">
        <h2 className="font-display font-medium text-lg leading-5 mb-1.5 text-balance">
          {movie.title}
        </h2>
        <p className="font-display text-md">{movie.release_date}</p>
      </div>
    </article>
  );
}
