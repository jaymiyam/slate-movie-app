import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import TrendingMovies from '../components/TrendingMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import UpcomingMovies from '../components/UpcomingMovies';
import NowPlayingMovies from '../components/NowPlayingMovies';
import SearchResults from '../components/SearchResults';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [query, setQuery] = useState('');

  function handleSearchResults(data, query) {
    setSearchResults(data);
    setQuery(query);
  }

  return (
    <>
      <SearchForm handleSearchResults={handleSearchResults} />
      <section className="py-4 md:py-10">
        {searchResults && <SearchResults data={searchResults} query={query} />}
        <NowPlayingMovies />
        <TrendingMovies />
        <UpcomingMovies />
        <TopRatedMovies />
      </section>
    </>
  );
}
