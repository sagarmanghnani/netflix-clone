import { Injectable } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { Subject } from 'rxjs';
import { MovieDetails } from 'src/modals/movie-details';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private _trendingMovies: Subject<MovieData[]>= new Subject();
  private _movieDetailsMap:Map<number, MovieDetails> = new Map();
  private _movieGenreMap:Map<number, string> = new Map();
  constructor() { }

  set setTrendingMovies(movies:MovieData[]){
    this._trendingMovies.next(movies);
  }

  get getTrendingMovies(){
    return this._trendingMovies.asObservable();
  }

  set setMovieDetailsMap(movieDetailsMap:Map<number, MovieDetails>){
    this._movieDetailsMap = movieDetailsMap;
  }

  get getMovieDetailsMap(){
    return this._movieDetailsMap;
  }

  set movieGenre(genreMap:Map<number, string>){
    this._movieGenreMap = genreMap;
  }

  get movieGenre(){
    return this._movieGenreMap;
  }
  
}
