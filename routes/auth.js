const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin, signout } = require("../controller/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 charcter required"),

    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Atleast 5 charcter required"),
  ],
  signup
);


router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 2 })
      .withMessage("password field id required"),
  ],
  signin
);

router.get("/signout", signout);


module.exports = router;
