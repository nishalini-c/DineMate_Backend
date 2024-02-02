// controllers/paymentController.js
import Payment from '../models/paymentmodel.js';
import Order from'../models/oder.js'
import Reservation from '../models/Reservation.js';

 const createPayment = async (req, res) => {
  try {
    const { amount, orderId, reservationId } = req.body;

    let payment = new Payment({ amount });

    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      payment.order = order;
    }

    if (reservationId) {
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      payment.reservation = reservation;
    }

    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['success', 'cancel'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Send appropriate messages based on the payment status
    const message =
      status === 'success'
        ? 'Your payment is successful.'
        : 'Your payment is cancelled.';

    res.json({ message, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPayment,  
  updatePaymentStatus
}

