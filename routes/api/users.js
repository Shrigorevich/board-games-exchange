const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
   const { username, password } = req.body;
   //Simple validation
   if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
   }
   //Check for existing user
   const check = await User.findOne({ username });

   if (check) return res.status(400).json({ msg: "User already exists" });

   const user = new User({ username, password });
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
                  res.json({
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

// try {
//    const ctr = new Counter({
//       _id: "gameid",
//       seq: 0
//    })
//    ctr.save().then((res, rej) => {console.log('Success');
//    })

//  } catch (e) {
//    console.log(e);

//  }

// async function getNextSequenceValue(sequenceName) {
//    let filter = { _id: sequenceName };
//    let update = { $inc: { seq: 1 } };
//    let sequenceDocument = await Counter.findOneAndUpdate(filter, update, {
//       new: true,
//    });
//    console.log(sequenceDocument);

//    return await sequenceDocument.seq;
// }
