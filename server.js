require("dotenv").config();
const http = require("http");
const socketio = require("socket.io");
const colors = require('colors')
const app = require("./server/app");
const {databaseSetup} = require('./server/config/database.config')
const assetsSetup = require('./server/config/static.config')

//server setups
const PORT = process.env.PORT || 5050;
databaseSetup()
assetsSetup()

//socket connection
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => {
  console.log((`server is running on port http://localhost:${PORT}`.yellow.bold.underline));
});
