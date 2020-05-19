const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const {Game} = require("../../models/Game");
const auth = require("./../../middlwares/auth");
const imgurUpload = require("./../../middlwares/imgur-upload");
const upload = require("./../../middlwares/multer");
const cleaner = require("./../../middlwares/cleaner")

router.post(
   "/create-game",
   auth,
   upload.single("picture"),
   imgurUpload,
   cleaner,
   async (req, res) => {

      const picture = req.imgLink;
      const userid = req.user.id;
      const { name, price } = req.body;
      const user = await User.findById({_id: req.user.id});
      const username = user.username;
            
      const newGame = new Game({
         name,
         picture,
         price,
         userid,
         username
      });
   
      await newGame.save();
      res.status(201).json({
         msg: "Game added",
         game: { name, picture, price, userid, username },
      });      
   }
);

router.get("/list", auth, async (req, res) => {
   const gameList = await Game.find({ userid: req.user.id });
   res.status(200).json(gameList);
});

router.get("/full-list", async (req, res) => {
   const gameList = await Game.find();
   res.status(200).json(gameList);
});

router.get("/search/:string", async (req, res) => {
   const regExp = new RegExp(`${req.params.string}`, 'i');
   const gamesList = await Game.find({name: regExp})
   res.status(200).json(gamesList)
   
})

module.exports = router;
