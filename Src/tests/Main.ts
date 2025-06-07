import { User } from "../core/User";
import { Cinema } from "../core/Cinema";
import { Movie } from "../core/Movie";
import { Seat } from "../core/Seat";
import { Genre } from "../service/Genre";
import { Showtime } from "../service/ShowTime";
import { Booking } from "../service/Booking";
import { Payment } from "../service/Payment";
import { MovieManager } from "../service/MovieManager";
import { Ticket } from "../core/Ticket";

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

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
  console.log(`\n🔁 Booking ${booking.bookingId} cancelled.`);
}

function generateTicket(user: User, showtime: Showtime, seats: Seat[]): Ticket {
  return new Ticket(
    `T-${Math.random().toString(36).substring(2, 7)}`,
    user,
    showtime,
    seats,
    seats.reduce((sum, seat) => sum + (seat.zone === "VIP" ? 15 : 10), 0),
    new Date(),
    `QR-${Math.random().toString(36).substring(2, 10)}`,
    `REF-${Math.floor(100000 + Math.random() * 900000)}`
  );
}

function scanTicket(ticket: Ticket, inputQr: string): void {
  if (ticket.validateQRCode(inputQr)) {
    console.log(`\n✅ Ticket ${ticket.ticketId} validated. Welcome, ${ticket.user.name}!`);
  } else {
    console.log("\n❌ Invalid QR Code. Access denied.");
  }
}

// --- Initialization ---
const movieManager = new MovieManager();
const showtimeDate = parseDate("06-05-2025");
const cinema = new Cinema("C001", "Galaxy Cinema", "City Center", 6);
const movie = new Movie("M001", "Interstellar", Genre.SCIFI, 169, "PG-13", "Sci-fi space adventure");

const seats: Seat[] = [
  new Seat("S1", "A", 1, "Standard", "Available"),
  new Seat("S2", "A", 2, "VIP", "Available"),
  new Seat("S3", "A", 3, "Standard", "Booked"),
];

const showtime = new Showtime("ST001", movie, cinema, showtimeDate, seats);
movie.addShowTime(showtime);
cinema.showtimes.push(showtime);
movieManager.addMovie(movie);

const user = new User("U001", "Alice", "alice@example.com", "pass123");
user.walletBalance = 60;

console.log("\n📅 Showtimes:");
movieManager.getAllShowtimes().forEach(show => {
  console.log(`- ${show.movie.title} at ${show.cinema.name} on ${formatDate(show.dateTime)}`);
});

console.log("\n🪑 Available Seats:", getAvailableSeats(showtime.seats).map(seat => `${seat.row}${seat.number}`).join(", "));

// Booking Process
const seatsToBook = [seats[0], seats[1]];
reserveSeats(showtime, seatsToBook);
const booking = new Booking("B001", user, showtime, seatsToBook, new Date());

const paymentHandler = new Payment();

if (paymentHandler.processPayment(booking)) {
  confirmBooking(booking);
  const ticket = paymentHandler.generateTicket(booking);

  console.log("\n🎟️ Ticket Info:");
  ticket.displayTicket();

  scanTicket(ticket, ticket.qrCode);
  scanTicket(ticket, "QR-fake");

  cancelBooking(booking);
} else {
  console.log("\n❌ Payment failed: Insufficient balance.");
}

console.log("\n🪑 Final Seat Statuses:");
showtime.seats.forEach(seat => {
  console.log(`${seat.row}${seat.number}: ${seat.status}`);
});
