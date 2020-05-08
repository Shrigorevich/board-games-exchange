const { Router } = require("express");
const router = Router();
const User = require("../../models/User");
const Game = require("../../models/Game");
const auth = require("./../../middlwares/auth");
const imgurUpload = require("./../../middlwares/imgur-upload");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./uploads/");
   },
   filename: function (req, file, cb) {
      cb(
         null,
         `${new Date().toLocaleDateString().replace(/\//g, "-")}-${
            file.originalname
         }`
      );
   },
});

const upload = multer({ storage: storage });

router.post(
   "/create-game",
   auth,
   upload.single("picture"),
   imgurUpload,
   async (req, res) => {

      const picture = req.imgLink;
      const userid = req.user.id;
      const { name, price } = req.body;

      const newGame = new Game({
         name,
         picture,
         price,
         userid,
      });
   
      await newGame.save();
      res.status(201).json({
         msg: "Game added",
         game: { name, picture, price, userid },
      });
      console.log({
         msg: "Game added",
         game: { name, picture, price, userid },
      });
      
   }
);

router.get("/list", auth, async (req, res) => {
   const gameList = await Game.find({ userid: req.user.id });
   res.status(200).json(gameList);
});

module.exports = router;
