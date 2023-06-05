const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/CreateUser");
const foodItemRouter = require("./routes/product");
const OrderItemRouter = require("./routes/orderHistory");
const cors = require("cors");
const path = require("path");

const server = express();

// db connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}
main();
server.use(cors());
server.use(express.json());
server.use("/user", userRouter.routes);
server.use("/fooditems", foodItemRouter.routes);
server.use("/order", OrderItemRouter);
server.use(express.static(path.resolve(__dirname, "build")));

server.listen(8080, () => {
  console.log("server started");
});
