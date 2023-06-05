const express = require("express");
const routes = express.Router();
const model = require("../models/FoodItems.js");
const FoodItem = model.FoodItems;

routes
  .get("/", async (req, res) => {
    const data = await FoodItem.find({});
    res.json(data);
  })
  .get("/category", async (req, res) => {
    const data = await model.foodCategory.find({});
    res.json(data);
  });

exports.routes = routes;
