import Showtime from '../service/ShowTime';
import Seat from '../core/Seat';
import SeatStatus from '../enum/SeatStatus';
import Booking from '../service/Booking';

export class SeatSelectionModule {
    private showtime: Showtime;

    constructor(showtime: Showtime) {
        this.showtime = showtime;
    }

    public displaySeatMap(): void {
        console.log(`Seat Map for ${this.showtime.getCinema().getName()}`);
        this.showtime.getZones().forEach(zone => {
            console.log(`\nZone: ${zone.getZoneType()}`);
            const seats = zone.getSeats();
            const rows = zone.getRows();
            const cols = zone.getCols();
            const header = '   ' + Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i)).join(' ');
            console.log(header);
            for (let row = 0; row < rows; row++) {
                const rowDisplay = `${row + 1} `.padStart(3, ' ') + seats[row].map(seat => {
                    switch (seat.getStatus()) {
                        case SeatStatus.AVAILABLE: return 'O';
                        case SeatStatus.RESERVED: return 'R';
                        case SeatStatus.BOOKED: return 'X';
                    }
                }).join(' ');
                console.log(rowDisplay);
            }
            console.log('O = Available, R = Reserved, X = Booked');
        });
    }

    public selectSeats(zone: Zone, selections: { row: number, col: number }[]): Seat[] {
        const selectedSeats: Seat[] = [];
        const seats = zone.getSeats();

        for (const { row, col } of selections) {
            if (row < 0 || row >= zone.getRows() || col < 0 || col >= zone.getCols()) {
                throw new Error(`Invalid seat position: ${String.fromCharCode(65 + col)}${row + 1}`);
            }
            const seat = seats[row][col];
            if (!seat.isAvailable()) {
                throw new Error(`Seat ${seat.getSeatNumber()} is not available`);
            }
            selectedSeats.push(seat);
        }

        if (selectedSeats.length > 1) {
            const row = selections[0].row;
            const cols = selections.map(s => s.col).sort((a, b) => a - b);
            if (selections.some(s => s.row !== row) || cols.some((c, i) => i > 0 && c !== cols[i - 1] + 1)) {
                throw new Error('Selected seats must be adjacent in the same row');
            }
        }

        selectedSeats.forEach(seat => seat.reserveSeat());
        return selectedSeats;
    }

    public confirmBooking(user: User, selectedSeats: Seat[]): Booking {
        if (selectedSeats.length === 0) {
            throw new Error('No seats selected');
        }
        const booking = new Booking(`B${Math.random().toString(36).substring(2, 9)}`, user, this.showtime, selectedSeats.map(s => [s]), new Date());
        booking.reserveSeats(selectedSeats);
        return booking;
    }
}