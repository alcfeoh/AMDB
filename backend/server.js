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
 * Description: Searches for movies if a query is provided, otherwise returns trending movies for the week.
 * Query Params: ?query=<movie_title> (optional)
 */
app.get('/search', async (req, res) => {
  const { query } = req.query;
  let response;

  try {
    if (query) {
      // A query is provided, so search for movies
      response = await axios.get(`${TMDB_API_BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
    } else {
      // No query, so get trending movies for the week
      response = await axios.get(`${TMDB_API_BASE_URL}/trending/movie/week`, {
        params: {
          api_key: API_KEY,
        },
      });
    }

    // Modify the results to include full image paths
    const modifiedResults = response.data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : null,
      backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path}` : null,
    }));

    // Send the modified data back
    res.json({ ...response.data, results: modifiedResults });

  } catch (error) {
    const errorMessage = query
      ? `Error fetching from TMDB search for query "${query}":`
      : 'Error fetching trending movies from TMDB:';
    console.error(errorMessage, error.message);
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
    return res.status(400).json({ message: 'A movie ID parameter is required.' });
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
