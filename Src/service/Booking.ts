import { Ticket } from "../core/Ticket";
import { User } from "../core/User";
import { Showtime } from "./ShowTime";
import { Seat } from "../core/Seat";


export class Booking {
  private ticket?: Ticket;

  constructor(
    public bookingId: string,
    private user: User,
    private showtime: Showtime,
    public seats: Seat[],
    private bookingDate: Date,
    private totalPrice: number
  ) {}

  addSeat(seat: Seat): void {
    this.seats.push(seat);
  }

}
