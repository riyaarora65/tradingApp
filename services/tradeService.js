const db = require("../db");
const tradeHelper = require("../helpers/tradeHelper");

const addTrade = async (req) => {
    try{
        let {
            tradeType,
            buyPrice,
            quantity,
            tickerSymbol
        } = req.body;

        if(!tradeType || !buyPrice || !quantity || !tickerSymbol){
            throw new Error("Missing Mandatory Params!!");
        }
        if(quantity <= 0 ||  buyPrice<=0){
            throw new Error("Invalid Request: Please enter valid quantity or buyPrice!!");
        }
        if(tradeType !== "BUY" && tradeType !== "SELL"){
            throw new Error("Invalid Request: Please enter valid trade type as BUY Or SELL!!");
        }
        if(tradeType === "BUY"){
            result = await tradeHelper.placeBuyOrder(req.body);
        }else if(tradeType === "SELL"){
            result = await tradeHelper.placeSellOrder(req.body);
        }
        return result;
    }catch(err){
        throw err;
    }
}

const updateTrade = async (req) => {
    try{
        let {
            tradeId,
            tradeType
        } = req.body;
        
        if(!tradeId || !tradeType || !buyPrice || !quantity || !tickerSymbol){
            throw new Error("Missing Mandatory Params!!");
        }
        if(quantity <= 0 ||  buyPrice<=0){
            throw new Error("Invalid Request: Please enter valid quantity or buyPrice!!");
        }
        if(tradeType !== "BUY" && tradeType !== "SELL"){
            throw new Error("Invalid Request: Please enter valid trade type as BUY Or SELL!!");
        }
        let trade = await db.findTrade(tradeId);
        if(trade && trade.type){
            if(trade.type === "BUY"){
                await tradeHelper.rollBackBuyTrade(trade);
            }else{
                await tradeHelper.rollBackSellTrade(trade);
            }
            await db.deleteTrade(tradeId);
            if(tradeType === "BUY"){
                result = tradeHelper.placeBuyOrder(req.body);
            }else if(tradeType === "SELL"){
                result = tradeHelper.placeSellOrder(req.body);
            }
        }else
            throw new Error("Invalid Trade ID!")
        return result;
    }catch(err){
        throw err;
    }
}

const removeTrade = async(req) => {
    try{
        let {
            tradeId
        } = req.body;
        if(!tradeId){
            throw new Error("Missing Mandatory Params!!");
        }
        let trade = db.findTrade(tradeId);
        if(trade && trade.type){
            if(trade.type === "BUY"){
                await tradeHelper.rollBackBuyTrade(trade);
            }else{
                await tradeHelper.rollBackSellTrade(trade);
            }
            await db.deleteTrade(tradeId);
        }else
            throw new Error("Invalid Trade!")
    }catch(err){
        throw err;
    }
}

const fetchTrade =async (req) => {
    try{
        let trades = await db.getAllTrades();
        return trades;
    }catch(err){
        throw err;
    }   
}

module.exports = { 
    fetchTrade,
    removeTrade,
    updateTrade,
    addTrade
}