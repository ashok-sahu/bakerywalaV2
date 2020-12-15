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


// Process
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
