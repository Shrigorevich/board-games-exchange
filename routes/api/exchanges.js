const { Router } = require("express");
const router = Router();
const {Game, Exchange} = require("../../models/Game");
const auth = require("./../../middlwares/auth");

router.post("/new-exchange", auth, async (req, res) => {
      
      const {firstGameId, secondGameId, initiator, partner} = req.body;
      
      const firstGame = await Game.findById({_id: firstGameId});
      const secondGame = await Game.findById({_id: secondGameId}); 
      const firstUser = {
         _id: initiator,
         status: true
      }
      const secondUser = {
         _id: partner,
         status: true
      }
           
      const exchange = new Exchange({
         firstGame,
         secondGame,
         firstUser,
         secondUser,
         status: false
      })

      await exchange.save()

      res.status(201).json({msg: "Exchange created"})
   }
);

router.get("/list", auth, async (req, res) => {   
   const fromMeList = await Exchange.find({$or: [{firstUser: {_id: req.user.id, status: false}}, {firstUser: {_id: req.user.id, status: true}}]}).sort({date: -1});
   const forMeList = await Exchange.find({$or: [{secondUser: {_id: req.user.id, status: false}}, {secondUser: {_id: req.user.id, status: true}}]}).sort({date: -1});
   res.status(200).json({fromMeList, forMeList});
});

router.post("/accept", auth, async (req, res) => {
   const {exchangeId} = req.body  
   await Exchange.updateOne({_id: exchangeId}, {status: true})
   res.status(200).json({msg: "Exchange is active now!"})
})
router.post("/reject", auth, async (req, res) => {
   const {exchangeId} = req.body  
   await Exchange.updateOne({_id: exchangeId}, {secondUser:{_id: req.user.id, status: false}, status: true})
   res.status(200).json({msg: "Exchange rejectet by you!"})
})


module.exports = router;

