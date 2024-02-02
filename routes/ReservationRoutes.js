import express from 'express';
const router = express.Router();
import {
    CreateNewReservation,
    getAllreservation,
    Updatereservation,
    deletereservation
} from '../controllers/Reservationcontroller.js';
import { isAdmin, protect } from "../middleware/authMiddleware.js";
//routes
router.post('/newreservation', CreateNewReservation)
router.get('/reservation', protect, isAdmin, getAllreservation)
router.put('/reservation/:id', protect, isAdmin, Updatereservation)
router.delete('/reservation/:id', protect, isAdmin, deletereservation);

export default router;