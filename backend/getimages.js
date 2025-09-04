const fs = require('fs/promises');
const axios = require('axios');

// --- Configuration ---
const API_KEY = '3799911f440cc5749c9d874b6eb027e8'; // Your provided API key
const INPUT_FILE = 'movies.json';
const OUTPUT_FILE = 'movies_with_images.json';
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 is a good thumbnail size

/**
 * Fetches movie data from TMDB API to find the poster path.
 * @param {string} title - The title of the movie.
 * @param {number} year - The release year of the movie.
 * @returns {Promise<string|null>} The poster path or null if not found.
 */
async function getPosterPath(title, year) {
  try {
    const response = await axios.get(TMDB_SEARCH_URL, {
      params: {
        api_key: API_KEY,
        query: title,
        year: year,
      },
    });

    // Check if we have results and return the first movie's poster path
    if (response.data && response.data.results.length > 0) {
      console.log(`✅ Found poster for: ${title}`);
      return response.data.results[0].poster_path;
    } else {
      console.log(`❌ Could not find poster for: ${title}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data for ${title}:`, error.message);
    return null;
  }
}

/**
 * Main function to read movies, fetch posters, and write the new file.
 */
async function main() {
  try {
    // 1. Read and parse the input JSON file
    const data = await fs.readFile(INPUT_FILE, 'utf8');
    const movies = JSON.parse(data);
    console.log(`Found ${movies.length} movies in ${INPUT_FILE}. Starting fetch...`);

    // 2. Process movies in chunks to respect rate limiting
    const updatedMovies = [];
    const chunkSize = 10;
    for (let i = 0; i < movies.length; i += chunkSize) {
      const chunk = movies.slice(i, i + chunkSize);
      const promises = chunk.map(async (movie) => {
        const posterPath = await getPosterPath(movie.title, movie.year);
        return {
          ...movie,
          image: posterPath ? `${TMDB_IMAGE_BASE_URL}${posterPath}` : null,
        };
      });

      const chunkOfUpdatedMovies = await Promise.all(promises);
      updatedMovies.push(...chunkOfUpdatedMovies);

      // Wait for 1 second before processing the next chunk
      if (i + chunkSize < movies.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // 3. Write the updated movie list to the output file
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(updatedMovies, null, 2));

    console.log(`\n🎉 Success! Updated movie list saved to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('An error occurred during the process:', error);
  }
}

// Run the script
main();
