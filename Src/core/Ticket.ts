// In Ticket.ts
import type { User } from "./User";
import type { Showtime } from "../service/ShowTime";
import type { Seat } from "./Seat";

export class Ticket {
  [x: string]: any;
  constructor(
    public ticketId: string,
    public user: User,
    public showtime: Showtime,
    public seats: Seat[],
    public total: number,
    public issueDate:Date = new Date()
  ) {}

  displayTicket(): void {
  console.log(`\n🎫 Ticket ID: ${this.ticketId}`);
  console.log(`👤 User: ${this.user.name}`);
  console.log(`🎬 Movie: ${this.showtime.movie.title}`);
  console.log(`🏢 Cinema: ${this.showtime.cinema.name}`);
  console.log(`🪑 Seats: ${this.seats.map(seat => `${seat.row}${seat.number}`).join(", ")}`);
  console.log(`💵 Total: $${this.total}`);
  console.log(`🕒 Issued At: ${this.issueDate.toLocaleDateString()}\n`);
}

}
