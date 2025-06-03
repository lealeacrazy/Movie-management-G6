import Person from './Person';
import Cinema from './Cinema';
import Ticket from './Ticket';

export class Staff extends Person {
    private role: string;
    private cinema: Cinema;

    constructor(id: string, name: string, role: string, cinema: Cinema) {
        super(id, name);
        this.role = role;
        this.cinema = cinema;
    }

    // User Story 5: Check QR code for ticket validity
    public checkTicketQR(ticket: Ticket): boolean {
        const showtime = ticket.getShowTime();
        return showtime.getCinema() === this.cinema && ticket.getQRCode().startsWith("QR_");
    }

    public manageShowtime(): void {
        // Logic to manage showtimes
    }

    public getCinema(): Cinema {
        return this.cinema;
    }
}