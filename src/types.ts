/**
 * Represents a single Genre object as returned by the TMDb API.
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Represents a single Production Company object.
 */
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// --------------------------------------------------

/**
 * The response object for the GET /search endpoint.
 */
export interface SearchResponse {
  page: number;
  results: MovieSearchResult[];
  total_pages: number;
  total_results: number;
}

/**
 * Represents a single movie item within the 'results' array
 * from the /search endpoint.
 */
export interface MovieSearchResult {
  adult: boolean;
  backdrop_path: string | null; // Note: This is a full URL from your proxy
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // Note: This is a full URL from your proxy
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// --------------------------------------------------

/**
 * The response object for the GET /details endpoint.
 * This contains more detailed information than a search result.
 */
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null; // Note: This is a full URL from your proxy
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // Note: This is a full URL from your proxy
  production_companies: ProductionCompany[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
