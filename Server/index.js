const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
let userList = [];
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["Get", "Post"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    const { username, room } = data;

    const checkUser = userList.some(
      (user) => user.username === username && user.room === room
    );
    if (!checkUser) {
      userList.push(data);
      console.log("userlist: ", userList);
      console.log(
        `user with id: ${socket.id} joined room: ${room} with username ${username}`
      );
      socket.join(room);
    } else {
      console.log("checkuser: ", checkUser);
    }
    socket.emit("username", checkUser);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
    userList = [];
  });
});
server.listen(5000, () => {
  console.log("server running");
});
