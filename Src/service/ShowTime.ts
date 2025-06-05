import { Movie } from "../core/Movie";
import { Cinema } from "../core/Cinema";
import { Seat } from "../core/Seat";


export class Showtime {
  constructor(
    public showtimeId: string,
    public movie: Movie,
    public cinema: Cinema,
    public dateTime: Date,
    public seats: Seat[] = []
  ) {}

  getAvailableSeats(): Seat[] {
  return this.seats.filter(seat => seat.status === "Available");
}
// In Showtime.ts
updateDateTime(newDateTime: Date): void {
  this.dateTime = newDateTime;
}


  reserveSeats(seatsToReserve: Seat[]): void {
  for (const seat of seatsToReserve) {
    const found = this.seats.find(s => s.seatId === seat.seatId);
    if (found && found.isAvailable()) {
      found.markAsReserved();
    }
  }
}



}
