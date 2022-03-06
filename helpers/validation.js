const validateQuantityAndPrice = (quantity, buyPrice) => {
    if(quantity <= 0 ||  buyPrice<=0){
        throw new Error("Invalid Request: Please enter valid quantity or buyPrice!!");
    }
}

const validateTrade = (tradeType) => {
    if(tradeType !== "BUY" && tradeType !== "SELL"){
        throw new Error("Invalid Request: Please enter valid trade type as BUY Or SELL!!");
    }
}