// 5)fetch portfolio -> fetch all trades for the user
// 6)fetch returns -> on whole portfolio

const express = require("express");
const router = express.Router();
const controller = require('../controllers/portfolioController');

router.get('/fetchPortfolio', controller.fetchPortfolioForUser);
router.get('/fetchReturns', controller.fetchReturnsForUser);
module.exports =router