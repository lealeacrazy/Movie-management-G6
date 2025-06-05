export class Seat {
  [x: string]: any;
  constructor(
    public seatId: string,
    public row: string,
    public number: number,
    public zone: string,
    public status: "Available" | "Reserved" | "Booked"
  ) {}
  
  getSeatId(): string {
    return this.seatId;
  }

  isAvailable(): boolean {
    return this.status === "Available";
  }
  markAsReserved(): void {
    this.status = "Reserved";
  }

  markAsBooked(): void {
    this.status = "Booked";
  }

}
