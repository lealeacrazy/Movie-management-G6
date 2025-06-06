import { User } from "./User";
import { Showtime } from "../service/ShowTime";
import { Seat } from "./Seat";

export class Ticket {
  constructor(
    public ticketId: string,
    public user: User,
    public showtime: Showtime,
    public seats: Seat[],
    public total: number,
    public leaveDate: Date = new Date(),
    public qrCode: string = `QR-${Math.random().toString(36).substring(2, 10)}`,
    public referenceNumber: string = `REF-${Math.floor(100000 + Math.random() * 900000)}`
  ) {}

  displayTicket(): void {
    console.log(`\n🎫 Ticket ID: ${this.ticketId}`);
    console.log(`👤 User: ${this.user.name}`);
    console.log(`🎬 Movie: ${this.showtime.movie.title}`);
    console.log(`🏢 Cinema: ${this.showtime.cinema.name}`);
    console.log(`🪑 Seats: ${this.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}`);
    console.log(`💵 Total: $${this.total}`);
    console.log(`🕒 Leaved At: ${this.leaveDate.toLocaleString()}`);
    console.log(`📄 Reference #: ${this.referenceNumber}`);
    console.log(`🔳 QR Code: ${this.qrCode}`);
  }

  validateQRCode(input: string): boolean {
    return input === this.qrCode;
  }
}
