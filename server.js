// const fs = require('fs');
// const { request } = require('http');

// //Saving user's portfolio to the JSON file (porfolio.json)
// let data = fs.readFileSync('portfolio.json');
// let portfolioData = JSON.parse(data);
// console.log(portfolioData);

// function addPortfolioData(req, res){
//     var data = req.params;
//     var portfolioData = data.portfolioData;
//     var score = Number(data.score);
//     //use error handling here and conditions
// }


const WebSocket = require('ws');
//The port we're connecting to
const PORT = 3004;
const wss = new WebSocket.Server({ port: PORT});

console.log('wss up');

wss.on('connection', function(socket) {
    //Connfirming connection by client
    console.log('New client connected');

    socket.on('message', function(msg) {
        const received = console.log(msg);
        //This sends a copy of the msg sent via the client back to the client
        socket.send('' + msg);
    });
});

console.log((new Date()) + 'Server is listening on port ' + PORT);