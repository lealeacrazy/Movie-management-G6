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
    super(userId, name);
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
