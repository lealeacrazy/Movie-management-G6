export class Cinema {
    private cinemaId: string;
    private name: string;
    private location: string;
    private contactInfo: string;

    constructor(cinemaId: string, name: string, location: string, contactInfo: string) {
        this.cinemaId = cinemaId;
        this.name = name;
        this.location = location;
        this.contactInfo = contactInfo;
    }

    public addShowtime(movieId: string, showtime: Date): void {
        // Logic to add a showtime for a movie in this cinema
        console.log(`Showtime ${showtime} added for movie ID ${movieId} at cinema ${this.name}`);
    }

    addSeat(seatNumber: string, status: string): void {
        // Logic to add a seat with a specific status in this cinema
        console.log(`Seat ${seatNumber} with status ${status} added to cinema ${this.name}`);
    }

    addStaff(staffId: string, name: string, role: string): void {
        // Logic to add staff member to this cinema
        console.log(`Staff member ${name} with ID ${staffId} and role ${role} added to cinema ${this.name}`);
    }
}