const dotenv = require("dotenv");
const app = require("./app");
require("./config")
dotenv.config();

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection");
});

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`SERVER RUNNING IN PORTNO:${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log("a user connected");
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing", room));

  socket.on("removechatbar-send", (chatId) => {
    console.log("remove chat bar for this id", chatId);
    socket.to(chatId).emit("removechatbar-recieve", chatId);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return chat.users("users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
