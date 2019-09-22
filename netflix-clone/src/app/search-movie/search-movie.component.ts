import { Component, OnInit } from '@angular/core';
import { NetflixRequestService } from '../netflix-request.service';
import { MovieData } from 'src/modals/movie-data';
import { UtilService } from '../util.service';
import { FetchDataService } from '../fetch-data.service';
import { Constants } from 'src/Constants';
import * as moment from'moment';
@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  searchedMovieDataList:MovieData[] = [];
  isSearching:boolean;
  resultsFound:boolean;
  constructor(
    public netflixService:NetflixRequestService,
    public util:UtilService,
    public fetchService:FetchDataService
  ) { }

  ngOnInit() {
    this.isSearching = false;
    this.getTrendingMovie();
  }

  getMovieSearchString(ev:any){
    let val = ev.target.value;
    if(val && val.length > 2){
      this.isSearching = true;
      this.getSearchResults(val, 1);
    }else{
      this.isSearching = false;
      this.getTrendingMovie();
    }
  }

  getTrendingMovie(){
    
      let objtToGet = JSON.parse(localStorage.getItem(Constants.TRENDING_MOVIE));
      this.searchedMovieDataList = objtToGet.moviePaginateData.results;
      this.getUpcomingMovies(1);
    
  }

  getSearchResults(search_query:string, page_number:number){
    this.netflixService.getSearchedMovie(search_query, page_number).subscribe(res => {
      this.searchedMovieDataList = res.results;
      if(res.results.length > 0){
        this.resultsFound = true;
        this.util.generateHashMapOfSearchedMovies(search_query, res);
      }else{
        this.resultsFound = false;
        this.getTrendingMovie();
        // this.getUpcomingMovies(1);
      }
      
    });
  }

  searchByButton(ev){
    let val = ev.target.value;
    if(val && val.length > 2){
      this.isSearching = true;
      this.getSearchResults(val, 1);
    }
  }

  getUpcomingMovies(page:number){
    this.netflixService.getUpcomingMovies(page).subscribe(res => {
      this.fetchService.upcomingMovie = res.results;
      let currentTimeStamp = "" + (moment().startOf('day').valueOf());
      this.util.storeUpcomingForDay(res, currentTimeStamp);
    });
    this.getTopRatedMoviesOfDay(1);
  }

  getTopRatedMoviesOfDay(page:number){
    this.netflixService.getTopRatedMovie(page).subscribe(res => {
      this.fetchService.topRatedMovie= res.results;
      let currentTimeStamp = "" + (moment().startOf('day').valueOf());
      this.util.storeTopRatedMovieForDay(res, currentTimeStamp);
    });
  }

}
