const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { register, login, updateProfile } = authController;

router.get("/user", getUserData);
router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updateProfile);

module.exports = router;