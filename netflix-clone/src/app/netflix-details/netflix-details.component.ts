import { Component, OnInit, Input } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { NetflixRequestService } from '../netflix-request.service';
import { MovieDetails } from 'src/modals/movie-details';
import { FetchDataService } from '../fetch-data.service';
import { UtilService } from '../util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/Constants';
import { MovieDataPaginate } from 'src/modals/movie-data-paginate';

@Component({
  selector: 'app-netflix-details',
  templateUrl: './netflix-details.component.html',
  styleUrls: ['./netflix-details.component.scss']
})
export class NetflixDetailsComponent implements OnInit {
  movie_data:number;
  movieDetailsMap:Map<number, MovieDetails> = new Map();
  similarMovie:MovieDataPaginate = new MovieDataPaginate();
  constructor(
    public netflixService:NetflixRequestService,
    public fetchDataService:FetchDataService,
    public util:UtilService,
    public router:Router,
    public route:ActivatedRoute
  ) { 

    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state){
      this.netflixCardData = this.router.getCurrentNavigation().extras.state.movie_data;
      this.getMovieDetails();
    }
  }

  netflixCardData:MovieData;
  netflixMovieData:MovieDetails = new MovieDetails();
  ngOnInit() {
      this.getSimilarMovie(1);
  }

  getMovieDetails(){
    this.netflixService.getMovieDetailsById(this.netflixCardData.id).subscribe(res => {
      this.netflixMovieData = res;
      this.createMovieDetailsMap();
    });
    this.netflixMovieData.runtime
  }

  createMovieDetailsMap(){
    let movieDetails:MovieDetails[]
    movieDetails = JSON.parse(localStorage.getItem(Constants.MOVIE_DETAILS));
    if(movieDetails && movieDetails.length  > 0){
       movieDetails.forEach( (movie,index) => {
          if(this.movieDetailsMap && this.movieDetailsMap.size > 0){
            if(!this.movieDetailsMap.has(movie.id)){
              this.movieDetailsMap.set(movie.id, movie);
            }else{
              movieDetails.splice(index,1);
            }
          }else{
            this.movieDetailsMap.set(movie.id, movie);
          }
       });
    }else{
      movieDetails = [];
      movieDetails.push(this.netflixMovieData);
      this.movieDetailsMap.set(this.netflixMovieData.id, this.netflixMovieData);
    }

    localStorage.setItem(Constants.MOVIE_DETAILS, JSON.stringify(movieDetails));
    this.fetchDataService.setMovieDetailsMap = this.movieDetailsMap;
  }

  getImageUrl(){
    return `${Constants.MOVIE_URL}${this.netflixMovieData.poster_path}`;
  }

  movieRuntimeCalculator(){
    let hour = Math.floor(this.netflixMovieData.runtime/60);
    let minute = Math.floor(this.netflixMovieData.runtime % 60);

    if(hour){
      return `${hour} hr ${minute} minutes`;
    }else{
      return `${minute} minutes`;
    }
  }

  getMovieGenre(){
    let genreString = '';
    let genreMap:Map<number, string> = this.fetchDataService.movieGenre;
    this.netflixCardData.genre_ids.forEach(genreId => {
      genreString += `,${genreMap.get(genreId)}`;
    });
    return genreString;
    // this.netflixMovieData.release_date
  }

  getSimilarMovie(page_number:number){
    this.netflixService.getSimilarMovie(this.netflixCardData.id, page_number).subscribe(res => {
      this.similarMovie = res;
    });
  }
  

}
