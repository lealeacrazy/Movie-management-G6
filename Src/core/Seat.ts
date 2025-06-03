import Cinema from './Cinema';
import Zone from './Zone';
import SeatStatus from '../enums/SeatStatus';

export class Seat {
    private id: string;
    private seatNumber: string;
    private status: SeatStatus;
    private cinema: Cinema;
    private zone: Zone;

    constructor(id: string, seatNumber: string, cinema: Cinema, zone: Zone) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.status = SeatStatus.AVAILABLE;
        this.cinema = cinema;
        this.zone = zone;
    }

    // User Story 2: Reserve seats
    public reserveSeat(): void {
        if (this.status === SeatStatus.AVAILABLE) {
            this.status = SeatStatus.RESERVED;
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

    public getCinema(): Cinema {
        return this.cinema;
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