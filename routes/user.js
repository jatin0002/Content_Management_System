const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser } = require("../controller/user");

const {  isAuthenticated } = require("../controller/auth");
const  isSignedIn  = require("../controller/verifyToken");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn,isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
