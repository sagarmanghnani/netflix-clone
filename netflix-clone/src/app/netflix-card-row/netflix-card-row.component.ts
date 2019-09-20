import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';

@Component({
  selector: 'app-netflix-card-row',
  templateUrl: './netflix-card-row.component.html',
  styleUrls: ['./netflix-card-row.component.scss']
})
export class NetflixCardRowComponent implements OnInit {

  @Input() netflixDataList:MovieData[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['netflixData'] && changes['netflixData'].currentValue && changes['netflixData'].currentValue.length > 0){
      this.netflixDataList = changes['netflixData'].currentValue;
    }

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // var width = document.getElementsByClassName('netflix-card-container')[0].offsetWidth;
    console.log(width);
  }

}
