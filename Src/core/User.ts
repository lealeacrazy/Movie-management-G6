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
    public reviews: Review[] = [],
    public walletBalance: number = 0
  ) {
    super(id, name); 
  }

  getRole(): string {
    return "User";
  }

  login(email: string, password: string): boolean {
    return this.email === email && this.password === password;
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }
}
