import Order from '../models/oder.js';
import asyncHandler from 'express-async-handler';
import MenuItem from '../models/menuItem.js';
import user from '../models/userModel.js';

const createOrder = async (req, res, next) => {
        try {
          const user_Id = req.body.user;  
          let order = await user.findById(user_Id);   
          //if (!order) return res.status(404).json({ msg: "No Item with that ID" });
          const newOrder = new Order ({
            user_Id: req.body.user_Id, 
            Category_id:req.body.Category_id,
            category:req.body.category,
            item:req.body. item,
            quantity:req.body.quantity,
            totalPrice : req.body.totalPrice,
            status: 'Pending',    
            });
            
            const existingOrder = await Order.findOne({ user_Id: user.user_Id });
            if (existingOrder) {
                // If an order exists, recheck the order history
                const orderHistory = await this.orderHistory(req, res, next);
                return res.status(200).json({ message: "Your order history", orderHistory });
            }

            let totalPrice = 0;
            let itemSummary = [];
            let menuItems = [];
            for (let eachItemInUserCart = 0; eachItemInUserCart < itemsToCheckoutSplit.length; eachItemInUserCart++) {
                const eachId = itemsToCheckoutSplit[eachItemInUserCart];

                const detailsOfItemFromCart = await Cart.findById(eachId);
                if (detailsOfItemFromCart == null) return res.status(200).json("Looks like there is no user with that cart or cart is empty");
                if (detailsOfItemFromCart.user_Id.toString() === user_Id ._id.toString()) {
                    const oneFood = await Food.findById(detailsOfItemFromCart.foodId);
                    const oneFoodPrice = oneFood.price; 
                    const foodItemQyt = detailsOfItemFromCart.qty;
                    const thisFoodItemPriceWithQyt = oneFoodPrice * foodItemQyt;
                    totalPrice += thisFoodItemPriceWithQyt;
                    const jsonOfSummary = {
                        foodName: oneFood.name,
                        foodId: oneFood._id,
                        foodQyt: foodItemQyt,
                        eachFoodPrice: oneFoodPrice,
                        oneFoodPriceWithQyt: thisFoodItemPriceWithQyt,
                    };
                    itemSummary.push(jsonOfSummary);

                    // Assume that oneFood.menuItemId is the reference to MenuItem model
                    const menuItem = await MenuItem.findById(oneFood.menuItemId);
                    const menuItemQyt = detailsOfItemFromCart.qty;
                    menuItems.push({
                        item: menuItem._id,
                        quantity: menuItemQyt,
                    });
                }
            }

            const userPhone = user_Id.phone;

            if (userPhone == null || userPhone == undefined) {
                return res.status(501).json("This checkout can't be implemented, please update your profile to have the address and phone number");
            }

            await new Order({
                user_Id: user.user_Id,
                cart: itemSummary,
                menuItems: menuItems,
                totalPrice: totalPrice,
                orderHistory: [{ status: "Order Placed" }],
                isSuccessful: true,
            }).save();

            let toDelete = [];
            for (let eachItemInUserCart = 0; eachItemInUserCart < itemsToCheckoutSplit.length; eachItemInUserCart++) {
                toDelete.push(itemsToCheckoutSplit[eachItemInUserCart]);
            }
            await Cart.deleteMany({ _id: { $in: toDelete } });

            return res.status(201).json({
                message: 'OrderAsSuccessful,',
                itemSummary: itemSummary,
                totalPrice: totalPrice,
            });
        } catch (error) {
            next(error);
        }
    }

     const orderHistory = async (req, res, next) => {
        const userId = req.user;
        const allUserOrder = await Order.find({
            user_Id: user_Id._id,
        });
        return allUserOrder;
       }
  

export { 
  createOrder,
  orderHistory
  };
