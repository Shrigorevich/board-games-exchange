const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./../middlwares/auth");

router.get("/", auth, async (req, res) => {
   const user = await User.findById(req.user.id)
   .select("-password")
   res.status(200).json({user: user, msg: "Verified"})
});

module.exports = router;
