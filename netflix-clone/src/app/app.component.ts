import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netflix-clone';
  constructor(
    public router:Router
  ) {}

  navigateToSearchPage(){
    this.router.navigate(['/search-movies'])
  }
}


