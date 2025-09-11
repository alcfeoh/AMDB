// Import necessary packages
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// --- Constants ---
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = '3799911f440cc5749c9d874b6eb027e8';

// --- API Routes ---

/**
 * Route: GET /search
 * Description: Searches for movies and returns results with full image paths.
 * Query Params: ?query=<movie_title>
 */
app.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(200).json({page: 0, results: [], total_pages: 0, total_results: 0});
  }

  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    // Modify the results to include full image paths
    const modifiedResults = response.data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : null,
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path}` : null,
    }));

    // Send the modified data back
    res.json({ ...response.data, results: modifiedResults });

  } catch (error) {
    console.error('Error fetching from TMDB search:', error.message);
    res.status(500).json({ message: 'Failed to fetch data from TMDB.' });
  }
});

/**
 * Route: GET /trending
 * Description: Gets trending movies for the week.
 */
app.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Modify the results to include full image paths
    const modifiedResults = response.data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : null,
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path}` : null,
    }));

    // Send the modified data back
    res.json({ ...response.data, results: modifiedResults });

  } catch (error) {
    console.error('Error fetching trending movies from TMDB:', error.message);
    res.status(500).json({ message: 'Failed to fetch data from TMDB.' });
  }
});

/**
 * Route: GET /details
 * Description: Gets movie details with full image paths.
 * Query Params: ?id=<movie_id>
 */
app.get('/details', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(200).json({page: 0, results: [], total_pages: 0, total_results: 0});
  }

  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Modify the single movie object to include full image paths
    const movieDetails = {
      ...response.data,
      poster_path: response.data.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${response.data.poster_path}` : null,
      backdrop_path: response.data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${response.data.backdrop_path}` : null,
    };

    // Send the modified data back
    res.json(movieDetails);

  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch movie details from TMDB.' });
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🎬 TMDB Proxy Server is running on http://localhost:${PORT}`);
});
