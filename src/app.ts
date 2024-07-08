import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        socket.emit('message', `Echo: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
