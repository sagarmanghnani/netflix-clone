import { Injectable } from '@angular/core';
import { MovieGenre } from 'src/modals/movie-genre';
import { MovieData } from 'src/modals/movie-data';
import { Constants } from 'src/Constants';
import { MovieDataPaginate } from 'src/modals/movie-data-paginate';
import { MovieDetails } from 'src/modals/movie-details';
import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  hashMap:Map<number, string> = new Map();
  upcomingMovie:MovieData[] = [];
  constructor(
    public fetchService: FetchDataService
  ) { }

  createMapForMovieGenres(movieGenre:MovieGenre){
    movieGenre.genres.forEach((value, index) => {
      if(!this.hashMap.has(value.id)){
        this.hashMap.set(value.id, value.name);
      }
    });
    this.fetchService.movieGenre = this.hashMap;
  }

  storeTrendingMovieForDay(moviePaginateData:MovieDataPaginate, time:string){
    let objToStore = {
      timestamp: time,
      moviePaginateData: moviePaginateData
    }
    localStorage.setItem(Constants.TRENDING_MOVIE, JSON.stringify(objToStore));
  }


  generateHashMapOfSearchedMovies(search_query:string, movieData:MovieDataPaginate){
    let moviePaginateData:Map<string, MovieDataPaginate> = new Map();
    moviePaginateData = new Map(JSON.parse(localStorage.getItem(Constants.SEARCHED_MOVIE)));
    if(moviePaginateData && moviePaginateData.size > 0){
      if(!moviePaginateData.has(search_query) && movieData.results.length > 0){
        moviePaginateData.set(search_query, movieData);
        localStorage.setItem(Constants.SEARCHED_MOVIE, JSON.stringify(Array.from(moviePaginateData.entries())));
      }
    }else{
      if(movieData.results.length > 0){
        moviePaginateData = new Map();
        moviePaginateData.set(search_query, movieData);
        localStorage.setItem(Constants.SEARCHED_MOVIE, JSON.stringify(Array.from(moviePaginateData.entries())));
      }
    }
  }

  storeUpcomingForDay(moviePaginateData:MovieDataPaginate, time:string){
    let objToStore = {
      timestamp: time,
      moviePaginateData: moviePaginateData
    };
    localStorage.setItem(Constants.UPCOMING_MOVIE, JSON.stringify(objToStore));
    this.upcomingMovie = moviePaginateData.results;
  }


}
