import TheatreManagement from '../models/TheatreManagement';
import Movie from '../models/Movie';
import Genre from '../enums/Genre';
import Showtime from '../models/Showtime';

export class MovieManagement {
    private theatreManagement: TheatreManagement;

    constructor(theatreManagement: TheatreManagement) {
        this.theatreManagement = theatreManagement;
    }

    // User Story 1: Filter movies by genre
    public getMoviesByGenre(genre: Genre): Movie[] {
        const movies: Movie[] = [];
        this.theatreManagement.getCinemas().forEach(cinema => {
            cinema.getSeats().forEach(seat => {
                seat.getZone().getShowtimes().forEach(showtime => {
                    const movie = showtime.getMovie();
                    if (movie.getGenre() === genre && !movies.includes(movie)) {
                        movies.push(movie);
                    }
                });
            });
        });
        return movies;
    }

    // User Story 1: Get showtimes for a movie
    public getShowtimes(movie: Movie, date: Date): Showtime[] {
        const showtimes: Showtime[] = [];
        this.theatreManagement.getCinemas().forEach(cinema => {
            cinema.getSeats().forEach(seat => {
                seat.getZone().getShowtimes().forEach(showtime => {
                    if (showtime.getMovie() === movie &&
                        showtime.getDateTime().toDateString() === date.toDateString()) {
                        showtimes.push(showtime);
                    }
                });
            });
        });
        return showtimes;
    }
}