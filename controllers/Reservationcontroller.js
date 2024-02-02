import TableReservation from "../models/Reservation.js";

//create new reservation /reservation
const CreateNewReservation = async (req, res) => {
  try {
    const data = new TableReservation({
      customer_name: req.body.customer_name,
      table_id: req.body.table_id,
      date: req.body.date,
      numberOfPeople: req.body.numberOfPeople,
      time: req.body.time
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}


// Get all reservation
const getAllreservation = async (req, res) => {
  try {
    const Reservation = await TableReservation.find();
    res.json(Reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a reservation /reservation/:id'
const Updatereservation = async (req, res) => {
  try {
    const updatedItem = await TableReservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a menu item 
// /reservation/:id
const deletereservation = async (req, res) => {
  try {
    await TableReservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  CreateNewReservation,
  getAllreservation,
  Updatereservation,
  deletereservation
}
