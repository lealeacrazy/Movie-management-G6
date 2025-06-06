import Seat from './Seat';
import Zone from '../enum/Zone';

export class Cinema {
    private id: string;
    private name: string;
    private location: string;
    private seats: Seat[];
    private zones: Zone[];

    constructor(id: string, name: string, location: string, zones: Zone[]) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.seats = [];
        this.zones = zones;
        zones.forEach(zone => {
            zone.getSeats().forEach(row => row.forEach(seat => this.seats.push(seat)));
        });
    }

    public getSeats(): Seat[] {
        return this.seats;
    }

    public getZones(): Zone[] {
        return this.zones;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}