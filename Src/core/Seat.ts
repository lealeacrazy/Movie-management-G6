import Cinema from './Cinema';
import Zone from '../enum/Zone';
import SeatStatus from '../enum/SeatStatus';

export class Seat {
    private id: string;
    private seatNumber: string;
    private status: SeatStatus;
    private cinema: Cinema;
    private zone: Zone;

    constructor(row: number, col: number, cinema: Cinema, zone: Zone) {
        this.id = `S${row}-${col}`;
        this.seatNumber = `${String.fromCharCode(65 + col)}${row + 1}`;
        this.status = SeatStatus.AVAILABLE;
        this.cinema = cinema;
        this.zone = zone;
    }

    public reserveSeat(): void {
        if (this.status === SeatStatus.AVAILABLE) {
            this.status = SeatStatus.RESERVED;
        }
    }

    public bookSeat(): void {
        if (this.status === SeatStatus.RESERVED) {
            this.status = SeatStatus.BOOKED;
        }
    }

    public releaseSeat(): void {
        this.status = SeatStatus.AVAILABLE;
    }

    public isAvailable(): boolean {
        return this.status === SeatStatus.AVAILABLE;
    }

    public getId(): string {
        return this.id;
    }

    public getSeatNumber(): string {
        return this.seatNumber;
    }

    public getZone(): Zone {
        return this.zone;
    }

    public getStatus(): SeatStatus {
        return this.status;
    }

    public setStatus(status: SeatStatus): void {
        this.status = status;
    }
}