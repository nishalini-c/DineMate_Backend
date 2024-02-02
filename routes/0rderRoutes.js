// routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import {
    createOrder
}
    from '../controllers/odercontroller.js';

//router.get('/orders', getAllOrders);
//router.get('/orders/:id', getOrderById);
router.post('/userorders', createOrder);
//router.put('/api/orders/:id/successful', OrderAsSuccessful)
// router.delete('/orders/:id', deleteOrder);

export default router;
