const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = Schema({
  CategoryName: { type: String },
  name: { type: String },
  img: { type: String },
  options: [{}],
  description: { type: String },
});
exports.FoodItems = mongoose.model("food_item", productSchema);

const catogerySchema = Schema({
  CategoryName: { type: String, unique: true },
});
exports.foodCategory = mongoose.model("food_categorie", catogerySchema);
