import { MovieData } from './movie-data';

export class MovieDataPaginate{
    page:number;
    total_pages:number;
    total_results:number;
    results:MovieData[];
}