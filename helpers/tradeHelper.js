const db = require("../db");

const placeBuyOrder = async (params) => {
    try{
        let {
            buyPrice,
            quantity,
            tickerSymbol
        } = params;
        await db.insertTrade("BUY", quantity, tickerSymbol, buyPrice);
        let portfolio = await db.findPortfolio(tickerSymbol);
        if(!portfolio){
            portfolio = await db.createDefaultPortfolio(tickerSymbol);
        }
        let initialTradePrice = portfolio.avgBuyPrice * portfolio.quantity;
        portfolio.quantity += quantity;
        let currentTradePrice = quantity*buyPrice;
        let totalTradePrice = currentTradePrice + initialTradePrice;
        portfolio.avgBuyPrice = totalTradePrice/portfolio.quantity;
        await db.updatePortfolio(portfolio);
        return portfolio;
    }catch(err){
        throw err;
    }
}

const placeSellOrder = async(params) => {
    try{
        let {
            tickerSymbol,
            quantity,
            buyPrice
        } = params;
        let portfolio = await db.findPortfolio(tickerSymbol);
        if(!portfolio){
            throw new Error("Invalid Request: No shares exist of this Security");
        }
        if(portfolio.quantity < quantity){
            throw new Error("Invalid Request: Quantity is more")
        }
        portfolio.quantity -= quantity;
        await db.updatePortfolio(portfolio);
        await db.insertTrade("SELL", quantity, tickerSymbol, buyPrice);
        return portfolio;
    }catch(err){
        throw err;
    }
}

const rollBackBuyTrade = async(trade) => {
    try{
        let {
            tickerSymbol,
            quantity,
            buyPrice
        } = trade;
        let portfolio = await db.findPortfolio(tickerSymbol);
        if(portfolio && portfolio.quantity && portfolio.avgBuyPrice){
            const currentShares = portfolio.quantity;
            const currentPrice = portfolio.avgBuyPrice;
            portfolio.avgBuyPrice = (currentPrice * currentShares - quantity * buyPrice) / (currentShares - quantity);
            portfolio.quantity = currentShares - quantity;
            await db.updatePortfolio(portfolio);
        }else
            throw new Error("Invalid Request: Portfolio not present")
    }catch(err){
        throw err;
    }
}

const rollBackSellTrade = async(trade) => {
    try{
        let {
            tickerSymbol,
            quantity
        } = trade;
        let portfolio = await db.findPortfolio(tickerSymbol);
        if(portfolio && portfolio.quantity){
            portfolio.quantity += quantity;
            await db.updatePortfolio(portfolio);
        }else
            throw new Error("Invalid Request: Portfolio not present");
    }catch(err){
        throw err;
    }
}

module.exports = {
    placeSellOrder,
    placeBuyOrder,
    rollBackSellTrade,
    rollBackBuyTrade
}