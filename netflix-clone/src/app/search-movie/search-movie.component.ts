import { Component, OnInit } from '@angular/core';
import { NetflixRequestService } from '../netflix-request.service';
import { MovieData } from 'src/modals/movie-data';
import { UtilService } from '../util.service';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  searchedMovieDataList:MovieData[] = [];
  isSearching:boolean;
  constructor(
    public netflixService:NetflixRequestService,
    public util:UtilService,
    public fetchService:FetchDataService
  ) { }

  ngOnInit() {
  }

  getMovieSearchString(ev:any){
    let val = ev.target.value;
    if(val && val.length > 2){
      this.isSearching = true;
      this.getSearchResults(val, 1);
    }else{
      this.isSearching = false;
      this.fetchService.getTrendingMovies().subscribe(res => {
        this.searchedMovieDataList = res; 
      });
    }
  }

  getSearchResults(search_query:string, page_number:number){
    this.netflixService.getSearchedMovie(search_query, page_number).subscribe(res => {
      this.searchedMovieDataList = res.results;
      this.util.generateHashMapOfSearchedMovies(search_query, res);
    });
  }

}
