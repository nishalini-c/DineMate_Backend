import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  menu_id: {
    type: Number,
  },
  item_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }

});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
