import { MovieData } from './movie-data';
import { ProductionCompanies } from './production-companies';

export class MovieDetails extends MovieData{
    budget:number;
    homepage:string;
    imdb_id:number;
    tagline:string;
    runtime:number;
    production_companies:ProductionCompanies;
}