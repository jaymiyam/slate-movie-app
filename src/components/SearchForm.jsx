import React, { useRef, useState } from 'react';
import { searchMovies } from '../services/api';

export default function SearchForm({ handleSearchResults }) {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const query = inputRef.current.value;
    if (!query.trim()) return;
    if (isLoading) return;

    setIsLoading(true);

    try {
      const data = await searchMovies(query);
      handleSearchResults(data, query);
      setError(null);
    } catch (err) {
      setError({ message: err.message || 'failed to fetch movies!' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-screen flex flex-col justify-center text-center items-center gap-8 py-10 md:py-16 bg-[url(/image-home-hero-bg.png)]">
      <div className="w-full max-w-[1200px] px-8 mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-white text-balance uppercase px-4 mb-2">
          A Person Who Watch Movies Lives A Thousand Lives.
        </h1>
        <p className="text-white">
          Slate is an all-in-one movie database powered by the TMDB API
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1200px] mx-auto px-8 flex justify-center items-center h-[48px]"
      >
        <input
          className="bg-white rounded-l-md h-full w-full max-w-[800px] px-4 outline-0"
          type="text"
          placeholder="Search for movies"
          ref={inputRef}
        />
        <button className="h-full bg-emerald-400 font-display uppercase text-xl text-white px-6 py-2 rounded-r-md cursor-pointer hover:bg-emerald-500">
          Search
        </button>
      </form>
      {error && <p className="text-white">{error.message}</p>}
    </section>
  );
}
