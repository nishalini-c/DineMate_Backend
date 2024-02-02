import mongoose from "mongoose";

const ReservasionSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  table_id: {
    type: String,
    required: true
  },

  date: {
    type: String,

  },

  numberOfPeople: {
    type: String,

  },
  time: {
    type: String,
    require: true
  },

});

const Reservation = mongoose.model('Reservation', ReservasionSchema);

export default Reservation;


