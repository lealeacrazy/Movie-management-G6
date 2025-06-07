import { Booking } from "../service/Booking";

export class User {
  public bookings: Booking[] = [];
  walletBalance: any;

  constructor(
    public userId: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  getBookingHistory(currentTime: Date): {
    past: Booking[],
    current: Booking[],
    upcoming: Booking[]
  } {
    const past: Booking[] = [];
    const current: Booking[] = [];
    const upcoming: Booking[] = [];

    for (const booking of this.bookings) {
      const start = booking.showtime.dateTime;
      const end = new Date(start.getTime() + booking.showtime.movie.duration * 60000);

      if (currentTime < start) {
        upcoming.push(booking);
      } else if (currentTime >= start && currentTime <= end) {
        current.push(booking);
      } else {
        past.push(booking);
      }
    }

    return { past, current, upcoming };
  }
}
