const WebSocket = require("ws");
//The port we're connecting to
const PORT = 3004;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function (socket) {
   //Connfirming connection by client
   console.log("New client connected");

   socket.on("message", function (msg) {
      //   setInterval(() => {
      // socket.binaryType
      // for (let i of msg) {
      //    console.log(msg[i]);
      // }
      let data = JSON.parse(msg);
      console.log(
         "Message from client ------>  " +
            data.id +
            " " +
            data.firstName +
            " " +
            data.lastName +
            " " +
            typeof data
      );
      let stockPrice = Math.floor(Math.random() * 798);

      let val = (data.price + stockPrice) * data.shares;

      //   }, 300);
      //This sends a copy of the msg sent via the client back to the client
      socket.send("---> " + val);
   });
});

console.log("Server is listening on port " + PORT);
