// 1)Add trades -> BUY or sell
// 2)Update trade 
// 3)removing a trade
// 4)fetch trades -> for one security

const express = require("express");
const router = express.Router();
const controller = require('../controllers/tradesController');

router.post('/addTrade', controller.addTradesforSecurity);
router.post('/updateTrade', controller.updateTradeforSecurity);
router.post('/removeTrade', controller.removeTradeForSecurity);
router.get('/fetchTrade', controller.fetchTradesForSecurity)
module.exports =router