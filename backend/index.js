require("dotenv").config();

const http = require("http");

const socketIo = require("socket.io");

const app = require("./src/app");

const server = http.createServer(app);

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

const users = {};

io.on("connection", (socket) => {
  // Handle new user joining the chat
  socket.on("newUser", (data) => {
    users[socket.id] = data;
    io.emit("newUserResponse", users);
  });

  // Handle new message
  socket.on("sendMessage", (payload) => {
    io.emit("newMessage", payload);
  });

  // Handle user typing
  socket.on("typing", (data) => {
    if (data.typing) {
      socket.to(data.to).emit("isTyping", { user: users[socket.id] });
    } else {
      socket.to(data.to).emit("isTyping", { user: null });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("newUserResponse", users);
  });
});

server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.error(`Server is listening on ${port}`);
  }
});
