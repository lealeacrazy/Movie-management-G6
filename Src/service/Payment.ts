import Payment from '../models/Payment';
import User from '../models/User';
import Booking from '../models/Booking';
import BookingService from './Booking';

export class Payment{
    private bookingService: BookingService;

    constructor(bookingService: BookingService) {
        this.bookingService = bookingService;
    }

    // User Story 3: Process payment
    public processPayment(id: string, user: User, booking: Booking): Payment {
        const amount = this.bookingService.calculateTotal(booking);
        const payment = new Payment(id, user, booking, amount, new Date());
        if (payment.processPayment()) {
            return payment;
        }
        throw new Error('Payment processing failed');
    }

    public refund(payment: Payment): void {
        payment.refund();
        this.bookingService.cancelBooking(payment.getBooking());
    }
}