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

/**
 * Represents the collection a movie belongs to.
 */
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * Represents a production country.
 */
export interface ProductionCountry {
  iso_3166_1:  string;
  name: string;
}


/**
 * Represents a spoken language.
 */
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
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
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
