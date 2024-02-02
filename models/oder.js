import  mongoose  from 'mongoose';

const orderSchema = new mongoose.Schema({
   user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
   },
   cart: [
      {
         Category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'menuItem', 
            required: true,
         },
         category: {
            type: String,
            required: true,
         },
         
      },
   ],
   menuItems: [
      {
          item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'menuItem',
              required: true,
          },
          quantity: {
              type: Number,
              required: true,
          },
      },
  ],
   totalPrice: {
      type: Number,
      required: true,
   },
   orderHistory: [
      {
         status: {
            type: String,
            required: true,
         },
         timestamp: {
            type: Date,
            default: Date.now,
         },
      },
   ],
   // isCancelled: {
   //    type: Boolean,
   //    default: false,
   // },
   isSuccessful: {
      type: Boolean,
      default: false,
   },
  
});

const Order = mongoose.model('Order', orderSchema);

export  default Order;
