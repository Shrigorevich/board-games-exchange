const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const Counter = require("../../models/Counter.js");
const bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken')
const auth = require('./../../middlwares/auth')

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password) {
     return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check for existing user
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User does not exists" });
  //Validate password
  bcrypt.compare(password, user.password).then(isMatch => {
    if(!isMatch) return res.status(400).json({msg: "Invalid credentials!"});

    jwt.sign(
      {id: user.id},
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if(err) throw err;
        res.json({
          token,
          user: {
             id: user.id,
             username: user.username
          },
       });
      }
    )
  })
});

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user));
})

module.exports = router;
