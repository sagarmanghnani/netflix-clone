import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Constants } from 'src/Constants';
import { Observable, of } from 'rxjs';
import { MovieGenre } from 'src/modals/movie-genre';
import { UtilService } from './util.service';
import { GenresData } from 'src/modals/genres';
import { MovieDataPaginate } from 'src/modals/movie-data-paginate';
import { MovieData } from 'src/modals/movie-data';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class NetflixRequestService {

  MOVIE_GENRES = `${Constants.BASE_URL}genre/movie/list?api_key=${Constants.API_KEY}&language=en-US`;
  TRENDING_MOVIES = `${Constants.BASE_URL}trending/all/day?api_key=${Constants.API_KEY}`;

  httpOptions;
  constructor(
    public http:HttpClient,
    public utils:UtilService
  ) {
     this.httpOptions = new HttpHeaders({
      "Content-type": "application/json"
    });
   }


  getMovieGenres():Observable<MovieGenre>{
    let movieGenre:GenresData[] = JSON.parse(localStorage.getItem(Constants.MOVIE_GENRE));
    if(movieGenre && movieGenre.length > 1){
      let objToSend:MovieGenre = new MovieGenre();
      objToSend.genres = movieGenre;
      return of(objToSend);
    }
    else{
      return this.http.get<MovieGenre>(this.MOVIE_GENRES, {
        headers:this.httpOptions
      });
    }
  }

  getTrendingMovies():Observable<MovieDataPaginate>{

    let objToGet:{
      timestamp: number,
      moviePaginateData: MovieDataPaginate
    } = JSON.parse(localStorage.getItem(Constants.TRENDING_MOVIE));
    if(objToGet && objToGet.moviePaginateData && objToGet.moviePaginateData.results && objToGet.moviePaginateData.results.length > 0 ){
      let endTime = (moment(+objToGet.timestamp).add(1, 'd').valueOf());
      let curentTime = moment().valueOf();
      if(curentTime > endTime){
        return this.http.get<MovieDataPaginate>(this.TRENDING_MOVIES, {
          headers: this.httpOptions
        });
      }else{
        return of(objToGet.moviePaginateData)
      }
      
    }

    return this.http.get<MovieDataPaginate>(this.TRENDING_MOVIES, {
      headers: this.httpOptions
    });
  }
}
