import React, { useEffect, useState } from 'react';
import { fetchMovieById } from '../services/api';
import { useParams } from 'react-router-dom';
import { useFavouritesContext } from '../contexts/FavouritesContext';

export default function MovieDetails() {
  const { addToFavourites, removeFavourite, checkIsFavourite } =
    useFavouritesContext();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const isFavourite = checkIsFavourite(Number(id));

  function handleToggleFavourite() {
    if (isFavourite) {
      removeFavourite(Number(id));
    } else {
      addToFavourites(movie);
    }
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(
          err.message || 'Something went wrong! Failed to get movie details.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [id]);

  return (
    <section className="w-full h-auto md:h-screen">
      {isLoading && (
        <div className="w-full h-screen grid place-items-center">
          <p className="text-white font-display text-2xl">Loading...</p>
        </div>
      )}
      {error && <h1>{error}</h1>}
      {movie && (
        <div
          className="w-full h-full bg-center bg-blend-multiply"
          style={{
            background: `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}") rgba(0, 0, 0, 0.75)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="w-full max-w-[1200px] mx-auto px-8 py-12 grid justify-items-center md:justify-items-start md:grid-cols-[auto_1fr] gap-10 text-white">
            <div className="">
              <img
                className="block w-full h-auto max-w-[320px] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="font-display font-medium text-4xl mb-2 text-balance">
                  {movie.title}
                </h1>
                <p className="text-emerald-300 italic">
                  {movie.release_date} ・ {movie.origin_country}・{' '}
                  {movie.genres[0].name}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={handleToggleFavourite}
                  className="h-full text-white font-display text-xl bg-emerald-500 px-6 py-2 rounded-md cursor-pointer hover:bg-emerald-400"
                >
                  {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                </button>
                <button className="h-full border border-emerald-300 font-display text-xl text-emerald-400 px-6 py-2 rounded-md cursor-pointer hover:bg-white">
                  <a href={movie.homepage} target="blank">
                    More Information
                  </a>
                </button>
              </div>
              <div>
                <h2 className="font-display text-3xl mb-2">Overview</h2>
                <p className="max-w-[60ch]">{movie.overview}</p>
              </div>
              <div>
                <h2 className="font-display text-3xl mb-2">Production</h2>
                <ul>
                  {movie.production_companies.map((company) => (
                    <li key={company.id}>・{company.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
