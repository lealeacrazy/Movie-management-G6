import { Booking } from "../service/Booking";

export class User {
  public bookings: Booking[] = [];
  walletBalance: any;

  constructor(
    public userId: string,
    public name: string,
    public email: string,
    public password: string,
    public bookings: Booking[] = [],
    public reviews: Review[] = [],
    public walletBalance: number = 0
  ) {
    super(id, name); 
  }

    constructor(id: string, name: string, email: string, password: string, role: UserRole = UserRole.USER) {
        super(id, name);
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public login(email: string, password: string): boolean {
        return this.email === email && this.password === password;
    }

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
