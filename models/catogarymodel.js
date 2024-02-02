import mongoose from "mongoose";


const CategorySchema = mongoose.Schema({
    Category_id: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Biriyanies', 'Kottu', 'noodeles', 'Desserts', 'fried Rice', 'tea &coffe', 'snakes'],
        default: 'Biriyanies'
    }
})
const Category = mongoose.model('Category', CategorySchema);

export default Category;