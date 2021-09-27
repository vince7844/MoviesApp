import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=655b30ff530c84a4be82da1befe825de';

// Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

// Get Popular TV
export const getPopularTV = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
  return resp.data.results;
};

// Get Documentaries
export const getDocumentaries = async () => {
  const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=99`);
  return resp.data.results;
};

// Get Movies Details
export const getMovie = async id => {
  const resp = await axios.get(
    `${apiUrl}/movie/${id}?${apiKey}`
  );
  return resp.data;
};

// Search Movies or TV by keyword
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`
  );
  return resp.data.results;
};