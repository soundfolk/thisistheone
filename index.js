const exp = require("express")()
const https = require("http").Server(exp);
const paths = require("path")

exp.get("/", (req, res) => {
    var option = {
        root: paths.join(__dirname)
    }
    var file = "Index.html"
    res.sendFile(file, option)
})

const io = require('socket.io')(https)

const users = {}

io.on("connection", socket => {
    console.log("Hello")
    socket.on("join", (name) => {
        users[socket.id] = name
        console.log(`${name} has joined`); // Log a message when a user joins
        socket.broadcast.emit("userJoined", name);
    })
    socket.on("send", data => {
        socket.broadcast.emit("recv", { names: users[socket.id], mess: data })
    })
})
const port = process.env.PORT || 5000;

https.listen(port, () => {
    console.log("User joined")
})