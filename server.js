const { default: axios } = require("axios");
const { addDoc, collection, serverTimestamp } = require("firebase/firestore");
const WebSocket = require("ws");
const { db } = require("./firebase");
//The port we're connecting to
const PORT = 3004;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function (socket) {
   //Connfirming connection by client
   console.log("New client connected");

   socket.on("message", async function (msg) {
      let data1 = JSON.parse(msg);

      let chartUrl = `https://cloud.iexapis.com/stable/stock/AAPL/chart/1d?token=pk_90c3c41220f34be0923e7849242f4814`;

      await axios.get(chartUrl).then(
         (response) => {
            let rand = Math.floor(Math.random() * 100);
            let rand2 = Math.floor(Math.random() * 100);

            // console.log(response.data[response.data.length - rand].marketClose);

            // let newPrice = JSON.stringify(data[data.length - 1].close);

            let newPrice =
               response.data[response.data.length - rand].marketClose;
            let oldPrice =
               response.data[response.data.length - rand2].marketClose;
            let gain = (newPrice - oldPrice) * data1.shares;

            let percentage = (gain / oldPrice) * 100;
            console.log(gain + " ---> " + percentage);

            addDoc(collection(db, "UserInfo", data1.email, "Graph"), {
               createdAt: serverTimestamp(),
               gain: parseFloat(gain),
               percentage: parseFloat(percentage),
               ticker: data1.ticker,
            });
         },
         (error) => {
            console.log(error);
         }
      );
   });
});

console.log("Server is listening on port " + PORT);
