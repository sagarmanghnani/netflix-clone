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

}
