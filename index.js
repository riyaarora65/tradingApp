const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const tradeRouter = require("./routes/trades");
const portfolioRouter = require("./routes/portfolio");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

let server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Coming from portfolioApp')
    console.log('Server started on port: ', PORT);
  });

app.use('/trades/', tradeRouter);
app.use("/portfolio", portfolioRouter);

const onError = () => {
    console.log('Something wrong');
}

server.on('error', onError);


module.exports = app;

/*
1)Add trades -> BUY or sell
2)Update trade 
3)removing a trade
4)fetch trades -> for one security
5)fetch portfolio -> fetch all trades for the user
6)fetch returns -> on whole portfolio

order -> tickersymbol type quantity id 
portfolio -> id tickersymbol sharesQuantity avgBuyPrice

EK USER hai uske pass kuch amount hai woh usko use krke buy ya sell krega 
jb woh koi particular order buy place krega then 

*/

