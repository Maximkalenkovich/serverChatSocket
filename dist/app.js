"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
app.get('/', function (req, res) {
    res.send('Socket.IO server is running');
});
io.on('connection', function (socket) {
    console.log('A client connected:', socket.id);
    socket.on('message', function (msg) {
        console.log('Received message:', msg);
        socket.emit('message', "Echo: ".concat(msg));
    });
    socket.on('disconnect', function () {
        console.log('A client disconnected:', socket.id);
    });
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map