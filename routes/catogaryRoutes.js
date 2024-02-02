import express from "express";
const router = express.Router();
import {
    createCatogary,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../controllers/catogarycontroller.js'
//middleware
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.get('/Categories', getAllCategories);
router.get('/Categories/:id', getCategoryById);
router.post('/newCatrgories', protect, isAdmin, createCatogary);
router.put('/Catrgorise/:id', protect, isAdmin, updateCategoryById);
router.delete('/Categories/:id', protect, isAdmin, deleteCategoryById);

export default router; 