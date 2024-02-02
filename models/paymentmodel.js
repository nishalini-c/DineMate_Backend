// models/transaction.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['order', 'reservation'],
    required: true,
  },
  details: {
    // Add fields common to both orders and reservations
    // Example: customerName, totalPrice, etc.
    // ...
  },
  status: {
    type: String,
    enum: ['success', 'cancel'],
    default: 'success',
  },
});

const Transaction = mongoose.model('payment', paymentSchema);

export default payment;
