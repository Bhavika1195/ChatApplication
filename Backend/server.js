const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200", // Allow Angular frontend
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
