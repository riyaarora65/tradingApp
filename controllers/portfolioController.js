const portfolioService = require("../services/portfolioService");

const fetchPortfolioForUser = async (req, res) => {
    try{
        let result = await portfolioService.fetchPortfolio(req);
        return res.status(200).send({success:1, error: undefined, result});
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
}

const fetchReturnsForUser = async (req, res) => {
    try{
        let result = await portfolioService.fetchReturns(req);
        return res.status(200).send({success:1, error: undefined, result}); 
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
}

module.exports = {
    fetchReturnsForUser,
    fetchPortfolioForUser
}