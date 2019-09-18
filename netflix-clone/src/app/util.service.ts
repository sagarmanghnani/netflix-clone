import { Injectable } from '@angular/core';
import { MovieGenre } from 'src/modals/movie-genre';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  hashMap:Map<number, string> = new Map();
  constructor() { }

  createMapForMovieGenres(movieGenre:MovieGenre){
    movieGenre.genres.forEach((value, index) => {
      if(!this.hashMap.has(value.id)){
        this.hashMap.set(value.id, value.name);
      }
    });
  }
}
