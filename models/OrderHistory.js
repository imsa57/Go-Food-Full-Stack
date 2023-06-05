const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderHistorySchema = new Schema({
  email: { type: String, unique: true, required: true },
  orderData: { type: [], required: true },
});

module.exports = mongoose.model("order_histrie", orderHistorySchema);
