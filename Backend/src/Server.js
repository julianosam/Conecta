 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 
 
 const routes = require("./Routes");


 const app = express();
 const server = require('http').Server(app);
 const io = require('socket.io')(server);

 const connectedUsers = {};

 io.on('connection', socket => {
     const { user } = socket.handshake.query;

     connectedUsers[user] = socket.id;
 
 });  

 mongoose.connect('mongodb+srv://conecta:conecta@cluster0-k2xur.mongodb.net/bdconecta?retryWrites=true&w=majority',{
      useUnifiedTopology: true,
      useNewUrlParser: true   
 });

 app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
 });

 app.use(cors());
 app.use(express.json());
 app.use(routes); 

 server.listen(3333);