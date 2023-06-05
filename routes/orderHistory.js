const express = require("express");
const routes = express.Router();
const order_histries = require("../models/OrderHistory");

routes
  .post("/orderpost", async (req, res) => {
    const isEmailExist = await order_histries.findOne({
      email: req.body.email,
    });
    const obj = req.body.orderData;
    const newobj = { ...req.body.orderData };
    if (isEmailExist) {
      const resp = await order_histries.findOneAndUpdate(
        { email: req.body.email },

        { $push: { orderData: newobj } }
      );
      res.json({ success: true });
    } else {
      await order_histries.create({
        email: req.body.email,
        orderData: [newobj],
      });
      res.json({ success: true });
    }
  })

  .post("/myorderdata", async (req, res) => {
    const data = await order_histries.findOne({ email: req.body.email });
    res.json(data.orderData);
  });
module.exports = routes;
