const express = require("express");
const routes = express.Router();
const model = require("../models/User");
const { body, validationResult } = require("express-validator");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenSecretKey = "mynameisimsa57";
routes.post(
  "/createuser",
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be 5 digit long"),

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      const newUser = await new User({ ...req.body, password: secPassword });
      newUser.save();
      res.json(newUser);
    } catch (error) {
      res.json(error);
    }
  }
);

routes.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    const userData = await User.findOne({ email });
    if (userData) {
      const result = await bcrypt.compare(req.body.password, userData.password);
      if (result) {
        const tokenObject = {
          user: {
            id: userData.id,
          },
        };
        const authToken = jwt.sign(tokenObject, tokenSecretKey);
        return res.json({ success: true, authToken, email });
      } else {
        return res.json("password is wrong");
      }
    } else {
      return res.json("Email is not registred");
    }
  } catch (error) {
    console.log(error);
  }
});

exports.routes = routes;
