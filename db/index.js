
const db = require("../models");

const getPortfolio = async () => {
    try{
        let portfolio = await db.Portfolio.findAll({
           raw:true
        });
        return portfolio;
    }catch(err){
        throw err;
    }
}

const findTrade = async(id) => {
    try{
        let trade = await db.Trade.findOne({
            where:{
                Id: id
            },raw:true
        });
        return trade;
    }catch(err){
        throw err;
    }
}

const deleteTrade = async(id) => {
    try{
        await db.Trade.destroy({
            where: {
                Id: id
            },raw:true
        });
    }catch(err){
        throw err;
    }
}

const getAllTrades =async () => {
    try{
        let trades = await db.Trade.findAll({
            raw:true
        });
        return trades;
    }catch(err){
        throw err;
    }
}

const insertTrade = async(type, quantity, tickerSymbol, buyPrice) => {
    try{
        await db.Trade.create({
            "tickerSymbol": tickerSymbol,
            "quantity": parseInt(quantity),
            "buyPrice": parseFloat(buyPrice),
            "type": type
        });
    }catch(err){
        throw err;
    }
}

const findPortfolio = async(tickerSymbol) => {
    try{
        let portfolio = await db.Portfolio.findOne({
            where:{
                tickerSymbol: tickerSymbol
            },raw:true
        });
        return portfolio;
    }catch(err){    
        throw err;
    }
}

const createDefaultPortfolio =async (tickerSymbol) => {
    try{
        let portfolio = await db.Portfolio.create({
            tickerSymbol: tickerSymbol,
            quantity: 0,
            avgBuyPrice: 0
        });
        return portfolio;
    }catch(err){
        throw err;
    }
}

const updatePortfolio =async (portfolio) => {
    try{
        await db.Portfolio.update(
            {
                quantity: portfolio.quantity,
                avgBuyPrice: portfolio.avgBuyPrice
            },
            {where: {
                Id: portfolio.Id
            }}
        )
    }catch(err){
        throw err;
    }
}

module.exports = {
    getPortfolio,
    findTrade,
    deleteTrade,
    getAllTrades,
    insertTrade,
    findPortfolio,
    createDefaultPortfolio,
    updatePortfolio
} 