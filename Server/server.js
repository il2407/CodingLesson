const http = require("http");
const app = require("./app");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

server.listen(PORT);
console.log("listen to port on", PORT);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("join_room", (data) => {
    socket.join(data);
  });
});
