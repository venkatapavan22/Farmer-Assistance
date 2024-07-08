import { Server } from "socket.io";
import http from 'http';

let io;

const initializeSocket = (app) => {
    const server = http.createServer(app);
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('newMessage', (message) => {
            io.emit('newMessage', message);
        });
    });

    const port = process.env.PORT || 7000;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    return io;
};

export { initializeSocket, io };
