import { Injectable } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private _trendingMovies: Subject<MovieData[]>= new Subject();
  constructor() { }

  set setTrendingMovies(movies:MovieData[]){
    this._trendingMovies.next(movies);
  }

  get getTrendingMovies(){
    return this._trendingMovies.asObservable();
  }

  
}
