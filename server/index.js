import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

let httpServer;
let io;

if (process.env.NODE_ENV === 'production') {
  const app = express();
  httpServer = createServer(app);
  io = new Server(httpServer);
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

}
else {
httpServer = createServer();
io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET"],
      credentials: true
  }
});
}
// Read in the "class" to store all our data on the server side
// If you need to change how data is handled, check the Data.js file!

import { Data } from "./Data.js";

//
import { sockets } from "./sockets.js";

let data = new Data();

io.on('connection', function (socket) {
  sockets(this, socket, data);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, function() {
    console.log("Socket.io server running on http://localhost:" + PORT);
});
