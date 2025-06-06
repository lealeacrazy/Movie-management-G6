// Payment.ts
import { Booking } from "../service/Booking";
import { Ticket } from "../core/Ticket";

export class Payment {
  private static TAX_RATE = 0.1; // 10% tax
  private static BOOKING_FEE = 2.5; // Fixed booking fee in dollars

  /**
   * Calculates the total price of the booking including tax and fees.
   */
  static calculateTotal(booking: Booking): number {
    const seatPrice = booking.seats.reduce((total, seat) => {
      const basePrice = seat.zone === "VIP" ? 15 : 10;
      return total + basePrice;
    }, 0);

    const tax = seatPrice * this.TAX_RATE;
    const total = seatPrice + tax + this.BOOKING_FEE;
    return parseFloat(total.toFixed(2));
  }

  /**
   * Processes a payment using the user's wallet balance.
   */
  static processPayment(booking: Booking): boolean {
    const total = this.calculateTotal(booking);

    if (!booking.user || typeof booking.user.walletBalance !== "number") {
      throw new Error("Invalid user or wallet balance.");
    }

    if (booking.user.walletBalance >= total) {
      booking.user.walletBalance -= total;
      booking.totalPrice = total;
      booking.isPaid = true;
      return true;
    }

    return false;
  }

  /**
   * Generates a digital ticket only if the booking is paid.
   */
  static generateTicket(booking: Booking): Ticket {
    if (!booking.isPaid) {
      throw new Error("Cannot generate ticket before payment.");
    }

    const ticketId = `T-${Math.random().toString(36).substring(2, 7)}`;

    const ticket = new Ticket(
      ticketId,
      booking.user,
      booking.showtime,
      booking.seats,
      booking.totalPrice,
      new Date()
    );

    booking.setTicket(ticket); // Optional: store ticket inside booking
    return ticket;
  }
}
