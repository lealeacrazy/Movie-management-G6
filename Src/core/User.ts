<<<<<<< HEAD
import Person from './Person';
import UserRole from '../enums/UserRole';
import Movie from './Movie';
import Genre from '../enums/Genre';
import Showtime from './Showtime';
import Booking from './Booking';
import Review from './Review';

export class User extends Person {
    private email: string;
    private password: string;
    private role: UserRole;
    private bookings: Booking[] = [];
=======
import { Person } from "./Person";
import { Booking } from "../service/Booking";
import { Review } from "./Review";

export class User extends Person {
  constructor(
    id: string,
    name: string,
    public email: string,
    public password: string,
    public bookings: Booking[] = [],
    public reviews: Review[] = []
  ) {
    super(id, name); 
  }
>>>>>>> 3fbd9bf1ffe272335c6485c159ecf3761e86d878

    constructor(id: string, name: string, email: string, password: string, role: UserRole = UserRole.USER) {
        super(id, name);
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public login(email: string, password: string): boolean {
        return this.email === email && this.password === password;
    }

<<<<<<< HEAD
    public updateProfile(name: string, email: string): void {
        this.name = name;
        this.email = email;
    }

    // User Story 1: Browse and filter movies by genre
    public getMoviesByGenre(genre: Genre, theatre: TheatreManagement): Movie[] {
        return theatre.getMoviesByGenre(genre);
    }

    // User Story 1: Browse showtimes for a movie on a specific date
    public getShowtimes(movie: Movie, date: Date, theatre: TheatreManagement): Showtime[] {
        return theatre.getShowtimes(movie, date);
    }

    // User Story 4: View upcoming and past bookings
    public getBookings(): Booking[] {
        const now = new Date();
        return this.bookings;
    }

    public getUpcomingBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => booking.getShowTime().getDateTime() >= now);
    }

    public getPastBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => booking.getShowTime().getDateTime() < now);
    }

    // User Story 6: Rate and review movie experience
    public addReview(movie: Movie, rating: number, comment: string): void {
        const review = new Review(`R${Math.random().toString(36).substring(2, 9)}`, this, movie, rating, comment);
        movie.addReview(review);
    }

    // Helper to add booking
    public addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getRole(): UserRole {
        return this.role;
    }
}
=======
  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }
}
>>>>>>> 3fbd9bf1ffe272335c6485c159ecf3761e86d878
