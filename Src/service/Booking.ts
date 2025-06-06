// Booking.ts
import { Ticket } from "../core/Ticket";
import { User } from "../core/User";
import { Showtime } from "./ShowTime";
import { Seat } from "../core/Seat";

export class Booking {
  public totalPrice: number = 0;
  public isPaid: boolean = false;
  public ticket?: Ticket;

  constructor(
    public bookingId: string,
    public user: User,                // ✅ Must be public so Payment.ts can access walletBalance
    public showtime: Showtime,
    public seats: Seat[],
    public bookingDate: Date
  ) {}

  addSeat(seat: Seat): void {
    this.seats.push(seat);
  }

  setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }
}
