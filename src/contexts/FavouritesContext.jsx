import { createContext, useContext, useEffect, useState } from 'react';

const FavouritesContext = createContext(null);

export function useFavouritesContext() {
  const value = useContext(FavouritesContext);
  if (!value) {
    throw new Error('Context can only be used with context provider');
  }
  return value;
}

export function FavouritesContextProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const storage = localStorage.getItem('react-movie-app-favourites');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'react-movie-app-favourites',
      JSON.stringify(favourites)
    );
  }, [favourites]);

  function addToFavourites(newMovie) {
    if (favourites.some((movie) => movie.id === newMovie.id)) return;
    setFavourites((prev) => [...prev, newMovie]);
  }

  function removeFavourite(id) {
    setFavourites((prev) => prev.filter((movie) => movie.id !== id));
  }

  function checkIsFavourite(id) {
    return favourites.some((movie) => movie.id === id);
  }

  const value = {
    favourites,
    addToFavourites,
    removeFavourite,
    checkIsFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
