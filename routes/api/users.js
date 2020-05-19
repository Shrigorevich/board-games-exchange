const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
   console.log('reg');
   
   const { firstName, lastName, username, email, password } = req.body;
   //Simple validation
   if (!firstName) {
      return res.status(400).json({ msg: "Please enter your Name!" });
   }
   if (!lastName) {
      return res.status(400).json({ msg: "Please enter your Last Name!" });
   }
   if (!username) {
      return res.status(400).json({ msg: "Please enter your username!" });
   }
   if (!email) {
      return res.status(400).json({ msg: "Please enter your email!" });
   }
   if (!password) {
      return res.status(400).json({ msg: "Please enter your password!" });
   }

   //Check for existing user
   const check = await User.findOne({$or:[ 
      {email}, {username} 
   ]});

   if(check){
      if(check.email === email){
         console.log('email exists');
         return res.status(400).json({ msg: "User already exists. Email must be unique!" });
      }else if(check.username === username){
         console.log('username exists');
         return res.status(400).json({ msg: "User already exists. Username must be unique!" });
      }
   }

   const user = new User({ firstName, lastName, username, email, password });
   //Create salt & hash
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
         if (err) throw err;
         user.password = hash;
         user.save().then((user) => {
            //Create token
            jwt.sign(
               { id: user.id },
               config.get("jwtSecret"),
               { expiresIn: '24h' },
               (err, token) => {
                  if (err) throw err;
                  res.status(201).json({
                     token,
                     user: {
                        id: user.id,
                        username: user.username,
                     },
                     msg: "User creater!",
                  });
               }
            );
         });
      });
   });
});

module.exports = router;