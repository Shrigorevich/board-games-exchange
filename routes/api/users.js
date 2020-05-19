const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const { Game } = require("../../models/Game")
const Comment = require("../../models/Comment")
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../../middlwares/auth')
const imgurUpload = require("./../../middlwares/imgur-upload");
const upload = require("../../middlwares/multer");
const cleaner = require('./../../middlwares/cleaner')

router.post("/", async (req, res) => {

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
   const check = await User.findOne({
      $or: [
         { email }, { username }
      ]
   });

   if (check) {
      if (check.email === email) {
         console.log('email exists');
         return res.status(400).json({ msg: "User already exists. Email must be unique!" });
      } else if (check.username === username) {
         console.log('username exists');
         return res.status(400).json({ msg: "User already exists. Username must be unique!" });
      }
   }

   const user = new User({ firstName, lastName, username, email, password, avatar: 'https://i.imgur.com/8GxCozl.png' });
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

router.get('/get-user/:username', async (req, res) => {
   const user = await User.findOne({ username: req.params.username }).select("-password")
   const games = await Game.find({ username: req.params.username })
   const comments = await Comment.find({ to: user._id }).populate('from')

   res.status(200).json({ user, games, comments })
})

router.post("/leave-comment", auth, async (req, res) => {
   const { text, rate } = req.body;

   const comment = new Comment({
      rate,
      text,
      to: req.body.to,
      from: req.user.id
   })

   comment.save().then(comment => {
      console.log("Comment: ", comment);
      if (comment) {
         res.status(201).json({ msg: "Comment added" })
      } else {
         res.status(400).json({ msg: "Error" })
      }
   })
})

router.post(
   "/set-avatar",
   auth,
   upload.single("picture"),
   imgurUpload,
   cleaner,
   async (req, res) => {
      const newUser = await User.findOneAndUpdate(
         { _id: req.user.id },
         { avatar: req.imgLink })
         .select("-password")
      
      res.status(200).json({ msg: 'Avatar updated' })
   }
)

module.exports = router;

