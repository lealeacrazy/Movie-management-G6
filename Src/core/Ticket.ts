import Booking from './Booking';
import Showtime from './Showtime';
import Seat from './Seat';

export class Ticket {
    private id: string;
    private booking: Booking;
    private showTime: Showtime;
    private seat: Seat;
    private qrCode: string;

    constructor(id: string, booking: Booking, showTime: Showtime, seat: Seat) {
        this.id = id;
        this.booking = booking;
        this.showTime = showTime;
        this.seat = seat;
        this.qrCode = `QR_${id}_${Math.random().toString(36).substring(2, 9)}`;
    }

    public printTicket(): void {
        console.log(`Ticket ${this.id} for ${this.showTime.getMovie().getTitle()} at ${this.seat.getSeatNumber()}`);
    }

    public getQRCode(): string {
        return this.qrCode;
    }

    public getId(): string {
        return this.id;
    }

    public getBooking(): Booking {
        return this.booking;
    }

    public getShowTime(): Showtime {
        return this.showTime;
    }

    public getSeat(): Seat {
        return this.seat;
    }
}