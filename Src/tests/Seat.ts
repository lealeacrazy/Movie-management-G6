import { Booking } from "../service/Booking";
import { User } from "../core/User";
import { Showtime } from "../service/ShowTime";
import { Seat } from "../core/Seat";
import { Ticket } from "../core/Ticket";
import { Movie } from "../core/Movie";
import { Cinema } from "../core/Cinema";
import { Genre } from "../service/Genre";

function getAvailableSeats(seats: Seat[]): Seat[] {
  return seats.filter(seat => seat.status === "Available");
}

function reserveSeats(showtime: Showtime, seatsToReserve: Seat[]): void {
  const reserved: string[] = [];
  const failed: string[] = [];

  for (const seat of showtime.seats) {
    const match = seatsToReserve.find(s => s.seatId === seat.seatId);
    if (match) {
      if (seat.status === "Available") {
        seat.status = "Reserved";
        reserved.push(`${seat.row}${seat.number}`);
      } else {
        failed.push(`${seat.row}${seat.number}`);
      }
    }
  }

  if (reserved.length > 0) {
    console.log("Reserved:", reserved.join(", "));
  }
  if (failed.length > 0) {
    console.log("Already reserved or booked:", failed.join(", "));
  }
}

function confirmBooking(booking: Booking): void {
  booking.seats.forEach(seat => {
    if (seat.status === "Reserved") {
      seat.status = "Booked";
    }
  });
  console.log("Seats booked:", booking.seats.map(seat => `${seat.row}${seat.number}`).join(", "));
}

function cancelBooking(booking: Booking): void {
  booking.seats.forEach(seat => {
    if (seat.status === "Booked") {
      seat.status = "Available";
    }
  });
  console.log(`🔁 Booking ${booking.bookingId} cancelled.`);
}

function calculateTotal(seats: Seat[]): number {
  let price = 0;
  for (const seat of seats) {
    price += seat.zone === "VIP" ? 15 : 10;
  }
  return price;
}

function generateTicket(user: User, showtime: Showtime, seats: Seat[]): Ticket {
  return new Ticket(
    `T-${Math.random().toString(36).substring(2, 7)}`,
    user,
    showtime,
    seats,
    calculateTotal(seats),
    new Date(),
    `QR-${Math.random().toString(36).substring(2, 10)}`,
    `REF-${Math.floor(100000 + Math.random() * 900000)}`
  );
}

function scanTicket(ticket: Ticket, inputQr: string): void {
  if (ticket.validateQRCode(inputQr)) {
    console.log(`Ticket ${ticket.ticketId} validated. Welcome, ${ticket.user.name}!`);
  } else {
    console.log("Invalid QR Code. Access denied.");
  }
}

// Create a User
const user = new User("U001", "Alice", "alice@mail.com", "pass123");

// Create a Movie
const movie = new Movie("M001", "Inception", Genre.SCIFI, 148, "Star-4", "Mind-bending thriller.");

// Create a Cinema
const cinema = new Cinema("C01", "Theater A", "Downtown", 10);

// Create Seats
const seat1 = new Seat("S001", "A", 1, "Standard", "Available");
const seat2 = new Seat("S002", "A", 2, "Standard", "Available");
const seat3 = new Seat("S003", "A", 3, "VIP", "Booked");

// Create Showtime
const showtime = new Showtime("ST001", movie, cinema, new Date("2025-06-05T19:00:00"), [seat1, seat2, seat3]);

// Show available seats
console.log("\nAvailable Seats:", getAvailableSeats(showtime.seats).map(seat => `${seat.row}${seat.number}`).join(", "));

// Reserve Seats
reserveSeats(showtime, [seat1, seat2, seat3]);

// Create Booking
const selectedSeats = [seat1, seat2];
const total = calculateTotal(selectedSeats);
const booking = new Booking("B001", user, showtime, selectedSeats, new Date(), total);

// Confirm Booking
confirmBooking(booking);

// Generate Ticket
const ticket = generateTicket(user, showtime, selectedSeats);

// Display Ticket 
console.log("\n🎟️ Ticket Info:");
ticket.displayTicket();

// QR Code Scan
scanTicket(ticket, ticket.qrCode);          
scanTicket(ticket, "QR-incorrectcode");      

// Cancel the booking 
cancelBooking(booking);


console.log("\n🪑 Final Seat Statuses:");
showtime.seats.forEach(seat => {
  console.log(`${seat.row}${seat.number}: ${seat.status}`);
});