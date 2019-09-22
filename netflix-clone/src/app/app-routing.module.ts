import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NetflixDetailsComponent } from './netflix-details/netflix-details.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';


const routes: Routes = [
  {path: '' ,pathMatch: 'full', component: HomeComponent},
  {path: 'movie-details', component: NetflixDetailsComponent, runGuardsAndResolvers: 'always'},
  {path: 'search-movies', component:SearchMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
