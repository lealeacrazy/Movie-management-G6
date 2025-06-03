import { Cinema } from "./Cinema";

class Staff extends Person {
    private role: string;
    private cinema: Cinema;

    constructor(id: string, name: string, role: string, cinema: Cinema) {
        super(id, name);
        this.role = role;
        this.cinema = cinema;
    }

    public manageShowtime(): void {
        // Logic to manage showtimes
    }

    public assistCustomer(): void {
        // Logic to assist customers
    }

    public getCinema(): Cinema {
        return this.cinema;
    }
}