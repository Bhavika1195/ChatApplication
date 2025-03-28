const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log("Client Connected");

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log("Client Disconnected");
    });
});

console.log("WebSocket Server is running on port 8080");