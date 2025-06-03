import User from './User';
import Showtime from './Showtime';
import Seat from './Seat';
import Ticket from './Ticket';

export class Booking {
    private id: string;
    private user: User;
    private showTime: Showtime;
    private seats: Seat[];
    private bookingDate: Date;

    constructor(id: string, user: User, showTime: Showtime, seats: Seat[], bookingDate: Date) {
        this.id = id;
        this.user = user;
        this.showTime = showTime;
        this.seats = seats;
        this.bookingDate = bookingDate;
        user.addBooking(this);
    }

    // User Story 2: Reserve seats
    public reserveSeats(seats: Seat[]): void {
        seats.forEach(seat => {
            if (this.seats.includes(seat) && seat.isAvailable()) {
                seat.reserveSeat();
                seat.setStatus(SeatStatus.BOOKED);
            }
        });
    }

    // User Story 3: Generate ticket
    public generateTickets(): Ticket[] {
        return this.seats.map(seat => new Ticket(`TICKET_${this.id}_${seat.getId()}`, this, this.showTime, seat));
    }

    public cancelBooking(): void {
        this.seats.forEach(seat => seat.releaseSeat());
    }

    // User Story 3: Calculate total price
    public calculateTotal(): number {
        const basePricePerSeat = 10.0;
        const taxRate = 0.1;
        const bookingFee = 2.0;
        const pricePerZone = {
            [ZoneType.STANDARD]: 1.0,
            [ZoneType.PREMIUM]: 1.5,
            [ZoneType.VIP]: 2.0
        };

        let total = 0;
        this.seats.forEach(seat => {
            const zoneMultiplier = pricePerZone[seat.getZone().getZoneType()];
            total += basePricePerSeat * zoneMultiplier;
        });
        total += total * taxRate + bookingFee;
        return total;
    }

    public getUser(): User {
        return this.user;
    }

    public getShowTime(): Showtime {
        return this.showTime;
    }

    public getSeats(): Seat[] {
        return this.seats;
    }
}