import * as express from "express";
import * as path from "path";

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use("/", express.static(path.resolve("public")));

io.on("connection", socket => {
  console.log("user login");

  socket.on("new message", message => {
    console.log(message);
    socket.broadcast.emit("new message", message);
  });
});

server.listen(8080, () => {
  console.log("http://127.0.0.1:8080");
});
