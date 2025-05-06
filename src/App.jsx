import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FavouritesContextProvider } from './contexts/FavouritesContext';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import AppFooter from './components/AppFooter';
import MovieDetails from './pages/MovieDetails';

export default function App() {
  return (
    <>
      <FavouritesContextProvider>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <AppFooter />
      </FavouritesContextProvider>
    </>
  );
}
