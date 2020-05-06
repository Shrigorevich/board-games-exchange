const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const Game = require("../../models/Game");
const Counter = require("../../models/Counter");
const auth = require("./../../middlwares/auth")
// const config = require('config');
// const jwt = require('jsonwebtoken')

router.post("/add-game", auth, async (req, res) => {

   const {name, picture, price} = req.body
   const user = await User.findById(req.user.id).select("-password")
   const userid = await user._id
   
   const newGame = new Game({
      name,
      picture,
      price,
      userid
   })
   
   await newGame.save()

   res.status(201).json({msg: "Game added", game: {name, picture, price, userid}})
});

router.get("/list", auth, async (req, res) => {
   const gameList = await Game.find({userid: req.user.id})
   res.status(200).json(gameList)
})


module.exports = router