import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NetflixCardComponent } from './netflix-card/netflix-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NetflixCardRowComponent } from './netflix-card-row/netflix-card-row.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { NetflixDetailsComponent } from './netflix-details/netflix-details.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NetflixCardComponent,
    NetflixCardRowComponent,
    NetflixDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbCarouselModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
