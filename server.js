const http = require("http");

const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the server</h1>");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening at ${PORT}...`));

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("countdown", () => {
    let count = 100;
    const interval = setInterval(() => {
      socket.emit("countdown", count);
      count--;

      if (count < 0) {
        clearInterval(interval);
      }
    }, 100);

    socket.on("stopCountdown", () => {
      clearInterval(interval);
    });
  });
});
