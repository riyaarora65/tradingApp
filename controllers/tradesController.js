const tradeService = require("../services/tradeService");

const addTradesforSecurity = async(req, res, next) => {
    try{
        let result = await tradeService.addTrade(req);
        return res.status(200).send({success:1, error:undefined, result});
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
}

const updateTradeforSecurity = async (req, res, next) => {
    try{
        let result = await tradeService.updateTrade(req);
        return res.status(200).send({success:1, error:undefined, result});
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
} 

const removeTradeForSecurity = async (req, res, next) => {
    try{
        let result = await tradeService.removeTrade(req);
        return res.status(200).send({success:1, error:undefined, result});
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
}

const fetchTradesForSecurity = async(req, res, next) => {
    try{
        let result = await tradeService.fetchTrade(req);
        return res.status(200).send({success:1, error:undefined, result});
    }catch(err){
        return res.status(500).send({success:0, error:err.message});
    }
}

module.exports = {
    fetchTradesForSecurity,
    removeTradeForSecurity,
    updateTradeforSecurity,
    addTradesforSecurity
}