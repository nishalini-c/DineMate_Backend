import Category from '../models/catogarymodel.js';

//create catogary 
const createCatogary = async (req, res) => {
   try {
      const newCategory = new Category({
         Category_id: req.body.Category_id,
         catrgory: req.body.catrgory,
      });
      const result = await newCategory.save();
      res.status(201).json(result);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
//get all catogaries
const getAllCategories = async (req, res) => {
   try { 
      const categories = await Category.find();
      res.status(200).json(categories);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
//get one catogary by id
const getCategoryById = async (req, res) => {
   try {
      const category = await Category.findById(req.params.id);
      if (!category) {
         return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
//update a catogary
const updateCategoryById = async (req, res) => {
   try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!category) {
         return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//delete categoryById
const deleteCategoryById = async (req, res) => {
   try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
         return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
export {
   createCatogary,
   getAllCategories,
   getCategoryById,
   updateCategoryById,
   deleteCategoryById
};

