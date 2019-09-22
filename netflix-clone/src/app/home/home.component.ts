import { Component, OnInit } from '@angular/core';
import { NetflixRequestService } from '../netflix-request.service';
import { UtilService } from '../util.service';
import { Constants } from 'src/Constants';
import { GenresData } from 'src/modals/genres';
import { FetchDataService } from '../fetch-data.service';
import * as moment from'moment';
import { MovieData } from 'src/modals/movie-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  netflixDataToPass:MovieData[] = [];
  horrorMovieData:MovieData[]=[];
  comedyMovieData:MovieData[] = [];
  crimeMovieData:MovieData[] = [];
  actionMovieData:MovieData[] = [];
  constructor(
    public netflixService:NetflixRequestService,
    public utils:UtilService,
    public fetchData:FetchDataService
  ) { }

  ngOnInit() {
    this.getNetflixMovieGenre();
  }

  getNetflixMovieGenre(){
    this.netflixService.getMovieGenres().subscribe(res => {
      this.utils.createMapForMovieGenres(res);
      let movieGenre:GenresData[] = JSON.parse(localStorage.getItem(Constants.MOVIE_GENRE));
      if(!movieGenre || movieGenre.length == 0){
        localStorage.setItem(Constants.MOVIE_GENRE, JSON.stringify(res.genres));
      }
      this.getTrendingMovies();
    });
  }

  getTrendingMovies(){
    this.netflixService.getTrendingMovies().subscribe(res => {
      this.fetchData.setTrendingMovies = res.results;
      this.netflixDataToPass = res.results;
      let currentTimeStamp = "" + (moment().startOf('day').valueOf());
      this.utils.storeTrendingMovieForDay(res, currentTimeStamp);
      this.getHorroMovie();
    });
  }

  getHorroMovie(){
    let genre_id = this.findGenreIdByGenreName("Horror");
    this.netflixService.getMoviesByGenre(genre_id).subscribe(res => {
      this.horrorMovieData = res.results;
      this.utils.generateMapOfGenreMovies(genre_id, res);
      this.getComedyMovie();
    });
  }

  getComedyMovie(){
    let genre_id = this.findGenreIdByGenreName("Comedy");
    this.netflixService.getMoviesByGenre(genre_id).subscribe(res => {
      this.comedyMovieData = res.results;
      this.utils.generateMapOfGenreMovies(genre_id, res);
      this.getCrimeMovieData();
    });
  }

  getCrimeMovieData(){
    let genre_id = this.findGenreIdByGenreName("Crime");
    this.netflixService.getMoviesByGenre(genre_id).subscribe(res => {
      this.crimeMovieData = res.results;
      this.utils.generateMapOfGenreMovies(genre_id, res);
      this.getActionMovieData();
    });
  }

  getActionMovieData(){
    let genre_id = this.findGenreIdByGenreName("Action");
    this.netflixService.getMoviesByGenre(genre_id).subscribe(res => {
      this.actionMovieData = res.results;
      this.utils.generateMapOfGenreMovies(genre_id, res);
    });
  }

  findGenreIdByGenreName(type:string){
    let genre_id:number;
    this.utils.hashMap.forEach((value, key) => {
      if(value == type){
        genre_id = key;
        
      }
    });
    return genre_id;
  }

  


}
