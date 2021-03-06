import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { Constants } from 'src/Constants';
import { UtilService } from '../util.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-netflix-card',
  templateUrl: './netflix-card.component.html',
  styleUrls: ['./netflix-card.component.scss']
})


export class NetflixCardComponent implements OnInit, OnChanges {
  
  @Input() netflixCarData:MovieData;
  showContentPlaceholder:boolean = true;
  @Output() iselementHover: EventEmitter<any> = new EventEmitter(); 
  constructor(public util:UtilService, public router:Router) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['netflixCarData'] && changes['netflixCarData'].currentValue.id){
      this.netflixCarData = changes['netflixCarData'].currentValue;
      this.showContentPlaceholder = false;
    }
  }

  getMovieImage(){
    return `${Constants.MOVIE_URL}${this.netflixCarData.poster_path}`;
  }

  showContentOnMouseHover(ev){
    this.netflixCarData["isHover"] = true;
    setTimeout(() => {
      let objToEmit = {
        status:true,
        height:ev.target.clientHeight,
        width:ev.target.clientWidth
      }
      this.iselementHover.emit(objToEmit);
    }, 100);
    
  }

  removeContentOnMouseLeave(ev){
    this.netflixCarData["isHover"] = false;

    setTimeout(() => {
      let objToEmit = {
        status:false,
        height:ev.target.clientHeight,
        width:ev.target.clientWidth
      }
      this.iselementHover.emit(objToEmit);
    }, 100);
    
  }

  getMovieGenre(){
    let genreString:string ='';
     this.netflixCarData.genre_ids.forEach(id => {
        genreString += `,${this.util.hashMap.get(id)}`
     });
     genreString = genreString.slice(1);
     return genreString;
  }


  navigateToMovieDetailPage(){
    let navigationExtras:NavigationExtras = {
      state: {
        movie_data:this.netflixCarData
      }
    }
    this.router.navigate(['/movie-details'], navigationExtras);
  }

  

}
