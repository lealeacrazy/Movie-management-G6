import { Genre } from "../enum/Genre";
import { Showtime } from "../service/ShowTime";
import { Review } from "./Review";


export class Movie {
  getTitle: any;
  
  constructor(
    public movieId: string,
    public title: string,
    public genre: Genre,
    public duration: number,
    public rating: string,
    public description: string,
    public showtimes: Showtime[] = [],
    public reviews: Review[] = []
  ) {}

  getShowtimes(): Showtime[] {
    return this.showtimes;
  }
  
  getGenre(): Genre {
    return this.genre;
  }
  addShowTime(showtime: Showtime): void {
  this.showtimes.push(showtime);
}

  
}
export { Genre };
