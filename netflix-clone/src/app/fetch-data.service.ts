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
  private _upcomingMovie: Subject<MovieData[]> = new Subject();
  private _topRatedMovie: Subject<MovieData[]> = new Subject();
  constructor() { }

  set setTrendingMovies(movies:MovieData[]){
    this._trendingMovies.next(movies);
  }

  getTrendingMovies(){
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

  set upcomingMovie(movies:MovieData[]){
    this._upcomingMovie.next(movies);
  }

  getPopularMovies(){
    return this._upcomingMovie.asObservable();
  }

  set topRatedMovie(movies: MovieData[]){
    this._topRatedMovie.next(movies);
  }
  
}
