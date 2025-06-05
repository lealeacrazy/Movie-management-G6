import { Movie } from "../core/Movie";
import { Genre } from "./Genre";
import { Showtime } from "./ShowTime";

export class MovieManager {
  constructor(private movies: Movie[] = []) {}

  // Add a movie
  addMovie(movie: Movie): void {
    this.movies.push(movie);
  }

  // Get all movies
  getAllMovies(): Movie[] {
    return this.movies;
  }

  // Get all showtimes across all movies
  getAllShowtimes(): Showtime[] {
    return this.movies.flatMap(movie => movie.getShowtimes());
  }

  // Get showtimes for a specific movie on a specific date
  getShowtimes(movie: Movie, date: Date): Showtime[] {
    return movie.getShowtimes().filter(showtime => {
      const showDate = new Date(showtime.dateTime);
      return (
        showDate.getFullYear() === date.getFullYear() &&
        showDate.getMonth() === date.getMonth() &&
        showDate.getDate() === date.getDate()
      );
    });
  }

  // Get movies by genre
  getMovieByGenre(genre: Genre): Movie[] {
    return this.movies.filter(movie => movie.genre === genre); // 🔧 changed from getGenre()
  }
}
