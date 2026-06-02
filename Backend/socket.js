const {Server} = require('socket.io');
const userModel = require('./src/models/user.model');
const captainModel = require('./src/models/captain.model');

let io;

async function initiateSocket(server){
    io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"],
            credentials:true
        }
    }
    )

    io.on("connection",(socket) =>{
        console.log("New user connected : ", socket.id);

        socket.on('join', async(data) =>{
            const {userId,userType} = data;

            if (userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{socketId:socket.id});
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{socketId:socket.id});
            }
        })

        socket.on('disconnect',()=>{
            console.log("user disconnected : ", socket.id);
        })
    })
}

function sendToSoc(socketId,message){
    if(io){
        io.to(socketId).emit('message',message);
    }
    else{
        console.log('Socket io not initialized');
    }
}

module.exports = {initiateSocket,sendToSoc};