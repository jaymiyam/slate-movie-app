const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5e38fbae568e75ca30799724e39fc85a';

export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch popular movies.');
  }
  return data.results;
}

export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch trending movies.');
  }
  return data.results;
}

export async function fetchTopRatedMovies() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch top rated movies.');
  }
  return data.results;
}

export async function fetchUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch top rated movies.');
  }
  return data.results;
}

export async function fetchNowPlayingMovies() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch top rated movies.');
  }
  return data.results;
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Something went wrong! Failed to fetch search results.');
  }
  return data.results;
}

export async function fetchMovieById(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      'Something went wrong! Failed to fetch the targeted movie.'
    );
  }
  // console.log(data);
  return data;
}

// ** TV Shows related logics **
// export async function fetchTrendingTvs() {
//   const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error('Something went wrong! Failed to fetch trending tv shows.');
//   }
//   return data.results;
// }

// export async function fetchTopRatedTvs() {
//   const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error('Something went wrong! Failed to fetch top rated tv shows');
//   }
//   return data.results;
// }

// export async function fetchTvById(id) {
//   const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(
//       'Something went wrong! Failed to fetch the targeted tv show.'
//     );
//   }
//   return data;
// }
