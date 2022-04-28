const { addDoc, collection, serverTimestamp } = require("firebase/firestore");
const WebSocket = require("ws");
const { db } = require("./firebase");
//The port we're connecting to
const PORT = 3004;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function (socket) {
   //Connfirming connection by client
   console.log("New client connected");

   socket.on("message", function (msg) {
      let data = JSON.parse(msg);
      let email = data.email;
      let stockPrice = Math.floor(Math.random() * 10);

      let gain = data.price - stockPrice;
      let percentage = (gain / stockPrice) * data.shares;
      addDoc(collection(db, "UserInfo", email, "Graph"), {
         createdAt: serverTimestamp(),
         gain: gain,
         percentage: percentage,
      });

      //   }, 300);
      //This sends a copy of the msg sent via the client back to the client
      socket.send("---> " + gain);
   });
});

console.log("Server is listening on port " + PORT);
