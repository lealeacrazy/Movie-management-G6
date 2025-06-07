import { User } from "../core/User";
import { Booking } from "../service/Booking";
import { Movie } from "../core/Movie";
import { Seat } from "../core/Seat";
import { Cinema } from "../core/Cinema";
import { Showtime } from "../service/ShowTime";
import { Genre } from "../enum/Genre";

// Create user
const user = new User("U001", "mealea", "mealea@mail.com", "pass123");

// Create movie
const movie = new Movie("M001", "Hariporter", Genre.SCI_FI, 148, "Star-4", "Magic and mystery at a wizard school.");

// Create cinema
const cinema = new Cinema("C01", "Theater A", "Downtown", 10);

// Create seats
const seat1 = new Seat("S001", "A", 1, "Standard", "Booked");
const seat2 = new Seat("S002", "A", 2, "Standard", "Booked");

// Create showtime
const showtime = new Showtime("ST001", movie, cinema, new Date("2025-06-05T19:00:00"), [seat1, seat2]);

// Create booking
const booking = new Booking("B001", user, showtime, [seat1, seat2], new Date("2025-06-05"));
booking.totalPrice = 20; // Assume paid
user.addBooking(booking);

// Generate and show booking history summary
const history = user.getBookingHistory(new Date());

console.log("\n📅 Booking History for", user.name);
console.log("\n✅ Past Bookings:");
history.past.forEach(b => {
  const movieTitle = b.showtime.movie.title;
  const seats = b.seats.map(seat => `${seat.row}${seat.number} (${seat.zone})`).join(", ");
  const date = b.showtime.dateTime.toLocaleString();
  console.log(`- ${movieTitle} on ${date} | Seats: ${seats} | Movie: ${movieTitle}`);
});
