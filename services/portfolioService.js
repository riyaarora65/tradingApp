const db = require("../db");

const fetchReturns =async (req) => {
    /*
    SUM(currentprice - avgbuyprice)* quantity
    */
    try{
        const currentPrice = 850;
        let portfolio = await db.getPortfolio();
        let sum=0;
         await portfolio.map(tradeItems => {
            let priceDiff = (currentPrice - tradeItems.avgBuyPrice)*tradeItems.quantity;
            sum += priceDiff;
        })
        return sum;
    }catch(err){
        throw err;
    }
}

const fetchPortfolio = (req) => {
    try{
        let portfolio = db.getPortfolio();
        return portfolio;
    }catch(err){
        throw err;
    }
}

module.exports = {
    fetchPortfolio,
    fetchReturns
}