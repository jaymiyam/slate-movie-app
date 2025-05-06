import React from 'react';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className="w-full bg-black text-white">
      <nav className="w-full max-w-[1200px] px-8 py-4 mx-auto flex justify-between items-center">
        <div>
          <Link
            className="font-display uppercase text-3xl font-medium text-emerald-400"
            to="/"
          >
            Slate.
          </Link>
        </div>
        <div className="flex gap-4 items-center font-display text-xl">
          <Link className="hover:text-emerald-400" to="/">
            Home
          </Link>
          <Link className="hover:text-emerald-400" to="/favourites">
            Favourites
          </Link>
        </div>
      </nav>
    </header>
  );
}
