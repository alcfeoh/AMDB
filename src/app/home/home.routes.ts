import {Routes} from '@angular/router';
import {Home} from './home';
import {SearchMovies} from '../search-movies/search-movies';
import {TrendingMovies} from '../trending-movies/trending-movies';


const routes: Routes = [{
  path: "",
  component: Home,
  children: [
    { path: "trending", component: TrendingMovies },
    { path: "search", component: SearchMovies },
    { path: "movie/:id",
      loadComponent: () => import("../movie-details/movie-details")
                              .then(m => m.MovieDetailsComponent) },
    { path: "", redirectTo: "trending", pathMatch: "full"}
  ]
}];

export default routes;
