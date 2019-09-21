import { Component, OnInit, Input, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MovieData } from 'src/modals/movie-data';
import { NetflixCardComponent } from '../netflix-card/netflix-card.component';

@Component({
  selector: 'app-netflix-card-row',
  templateUrl: './netflix-card-row.component.html',
  styleUrls: ['./netflix-card-row.component.scss']
})
export class NetflixCardRowComponent implements OnInit {

  @ViewChildren("slider") slides: QueryList<ElementRef>;
  @Input() netflixDataList:MovieData[];
  sliceValue: number = 5;
  sliderCount:number = 0;
  totalPage:number;
  rowHeight:string;
  columnWidth:string;
  isHover:boolean;
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
    // console.log(this.slides["_results"][0]);
    this.getTotalNumPages()
  }

  getTotalNumPages(){
    this.totalPage = Math.floor(this.netflixDataList.length / 4);
  }

  nextSlide(){
    if(this.totalPage > this.sliderCount){
      this.sliderCount++;
    }
  }

  previousSlide(){
    if(this.sliderCount > 0){
      this.sliderCount--;
    }
  }

  respondToHover(ev:any){
    if(ev.status){
      this.isHover = true;
      this.rowHeight = `${ev.height + 50}px`;
      this.columnWidth = `${ev.width + 80}px`;
    }else{
      this.isHover = false;
      this.rowHeight = `${ev.height + 50}px`;
      this.columnWidth = `${ev.width + 20}px`;
    }
  }

}
