const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Static Middleware
app.use(express.static(publicPath));

//
io.on('connection', (socket) => {
    console.log('User connected');

    //Emit an event for welcoming new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App!!!'));

    //Broadcast an event when a new user joins
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined...'));

    //Listen for an event when an user sends a new message
    socket.on('createMessage', function(newMessage) {
        console.log('New Message: ', newMessage);

        //IO.emit emits the event to every client
        //Send the new message to all the users
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        //broadcast will broadcast the event to all the clients except for the client
        //connect on this socket
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });

    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//Server
server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});