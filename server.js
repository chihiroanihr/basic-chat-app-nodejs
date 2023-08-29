// Import Express and HTTP
const express = require("express");
const http = require("http");

// Create an Express Application (Initialize)
const app = express();

// Create Server
const server = http.createServer(app);

// Define Port Number
const PORT = 3000;

// Respond with HTML file when a GET request is made to the rootpage.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // PATH: {current_dir}/index.html
});

// Import Socket.io and initialize a new instance of socket.io by passing the (HTTP) server object.
const io = require("socket.io")(server);

// [Server Side Socket] Listen on the connection event for incoming sockets.
io.on("connection", (socket) => {
  console.log("User has connected.");

  // Receive message from the client side
  socket.on("chat message", (msg) => {
    console.log("Message Received: " + msg);

    // Send back the message to the client side (for display purpose)
    io.emit("chat message", msg);
  });
});

// Start a Server
server.listen(PORT, () => {
  console.log("Server Listening on Port 3000");
});
