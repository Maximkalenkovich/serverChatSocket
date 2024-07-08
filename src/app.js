"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
// Добавляем этот код, чтобы отключить CORS проверки
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
io.on('connection', function (socket) {
    console.log("User connected: ".concat(socket.id));
    socket.on('message', function (msg) {
        console.log('Received message:', msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', function () {
        console.log("User disconnected: ".concat(socket.id));
    });
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map