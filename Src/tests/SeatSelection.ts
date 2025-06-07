import Cinema from '../core/Cinema';
import Seat from '../core/Seat';
import ZoneType from '../enum/Zone';
import Movie from '../core/Movie';
import Genre from '../enum/Genre';
import Showtime from '../service/ShowTime';
import User from '../core/User';
import UserRole from '../../enum/UserRole';
import Booking from '../../service/Booking';
import Payment from '../../service/Payment';
import Review from '../../core/Review';
import TheatreManagement from '../../service/TheatreManagement';
import Staff from '../../core/Staff';
import SeatSelectionModule from '../../utils/SeatSelectionModule';

// Initialize TheatreManagement
const theatre = new TheatreManagement("TM1", "City Theatres");

// Create zones
const standardZone = new Zone("Z1", ZoneType.STANDARD, 5, 5);
const premiumZone = new Zone("Z2", ZoneType.PREMIUM, 3, 4);
const vipZone = new Zone("Z3", ZoneType.VIP, 2, 3);

// Create a cinema with zones
const cinema = new Cinema("C1", "City Cinema", "Downtown", [standardZone, premiumZone, vipZone]);
standardZone.initializeSeats(cinema);
premiumZone.initializeSeats(cinema);
vipZone.initializeSeats(cinema);
theatre.addCinema(cinema);

// Create a movie and showtime
const movie = new Movie("M1", "Action Blockbuster", Genre.ACTION, 120, 8.5, "An action-packed adventure");
const showtime = new Showtime("ST1", movie, cinema, new Date(), 100, [standardZone, premiumZone, vipZone]);
standardZone.addShowtime(showtime);
premiumZone.addShowtime(showtime);
vipZone.addShowtime(showtime);

// Create a user
const user = new User("U1", "John Doe", "john@example.com", "password", UserRole.USER);

// Initialize seat selection module
const seatSelector = new SeatSelectionModule(showtime);

// Display seat map
seatSelector.displaySeatMap();

// Select seats in premium zone (e.g., A1, A2, A3 in premium zone)
try {
    const selectedSeats = seatSelector.selectSeats(premiumZone, [
        { row: 0, col: 0 }, // A1
        { row: 0, col: 1 }, // A2
        { row: 0, col: 2 }  // A3
    ]);
    console.log("Selected Seats:", selectedSeats.map(s => s.getSeatNumber()));

    // Confirm booking
    const booking = seatSelector.confirmBooking(user, selectedSeats);
    console.log(`Booking Confirmed: ${booking.getId()}`);

    // Display updated seat map
    seatSelector.displaySeatMap();

    // Calculate total and process payment
    const total = booking.calculateTotal();
    console.log(`Total Price: $${total.toFixed(2)}`);
    const payment = new Payment("P1", user, booking, total, new Date());
    console.log(`Payment Processed: ${payment.processPayment()}`);

    // Generate tickets
    const tickets = booking.generateTickets();
    tickets.forEach(ticket => {
        ticket.printTicket();
        console.log(`QR Code: ${ticket.getQRCode()}`);
    });

    // Staff checks ticket QR
    const staff = new Staff("S1", "Jane Staff", "Ticket Checker", cinema);
    console.log(`Ticket Valid: ${staff.checkTicketQR(tickets[0])}`);

    // User adds review
    user.addReview(movie, 5, "Great sound system and comfy seats!");
    console.log("Movie Reviews:", movie.getReviews().map(r => r.getRating()));
} catch (error) {
    console.error(`Error: ${error.message}`);
}