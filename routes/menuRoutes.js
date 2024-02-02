import express from 'express';
const router = express.Router();
import {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuItemController.js';
import { isAdmin, protect } from "../middleware/authMiddleware.js";
//  routes 
router.get('/allmenu', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', protect, isAdmin, createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
