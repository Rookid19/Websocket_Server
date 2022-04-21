const WebSocket = require("ws");
//The port we're connecting to
const PORT = 3004;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function (socket) {
   //Connfirming connection by client
   console.log("New client connected");

   socket.on("message", function (msg) {
      //   setInterval(() => {

      console.log("saved message " + msg);

      //   }, 300);
      //This sends a copy of the msg sent via the client back to the client
      socket.send("---> " + msg);
   });
});

console.log("Server is listening on port " + PORT);
