const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
