import { Person } from "./Person";
import { Booking } from "../service/Booking";
import { Review } from "./Review";
export class User extends Person {
  constructor(
    public userId: string,
    public name: string,
    public email: string,
    public password: string,
    public bookings: Booking[] = [],
    public reviews: Review[] = [],
    public walletBalance: number = 0
  ) {
    super(userId, name);
  }

  getRole(): string {
    return "User";
  }

  login(email: string, password: string): boolean {
    return this.email === email && this.password === password;
  }

  viewBookings(): Booking[] {
    return this.bookings;
  }

  leaveReview(movie: Movie, rating: number, comment: string): Review {
    const review = new Review(`review-${Date.now()}`, this, movie, rating, comment, new Date());
    this.reviews.push(review);
    movie.reviews.push(review);
    return review;
  }
}