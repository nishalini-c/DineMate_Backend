import MenuItem from '../models/menuItem.js';
import Order from '../models/oder.js';

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenuItemById = async (req, res) => {
  const menuItems = req.params.id;

  try {
    const menuItems = await menuItems.findById(menu_id);
    if (!menuItems) {
      return res.status(404).json({ error: 'menu not found' });
    }
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createMenuItem = async (req, res) => {
  const data = new MenuItem({
    menu_id: req.body.menu_id,
    item_name: req.body.item_name,
    price: req.body.price,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem

}