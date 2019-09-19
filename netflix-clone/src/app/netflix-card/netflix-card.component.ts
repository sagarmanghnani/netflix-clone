import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { Constants } from 'src/Constants';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-netflix-card',
  templateUrl: './netflix-card.component.html',
  styleUrls: ['./netflix-card.component.scss']
})
export class NetflixCardComponent implements OnInit, OnChanges {

  @Input() netflixCarData:MovieData 
  constructor(public util:UtilService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['netflixCarData'] && changes['netflixCarData'].currentValue.id){
      this.netflixCarData = changes['netflixCarData'].currentValue;
      this.netflixCarData.original_title
    }
  }

  getMovieImage(){
    return `${Constants.MOVIE_URL}${this.netflixCarData.poster_path}`;
  }

  showContentOnMouseHover(){
    this.netflixCarData["isHover"] = true;
  }

  removeContentOnMouseLeave(){
    this.netflixCarData["isHover"] = false;
  }

  getMovieGenre(){
    let genreString:string ='';
     this.netflixCarData.genre_ids.forEach(id => {
        genreString += `,${this.util.hashMap.get(id)}`
     });
     return genreString;
  }

}
