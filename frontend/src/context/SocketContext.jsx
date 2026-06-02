import React from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {io} from 'socket.io-client';

export const SocketContext1 = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({children}) => {

    useEffect(()=>{

        socket.on('connect',()=>{
            console.log("new user connected :", socket.id);
        })

        socket.on('disconnect',()=>{
            console.log("user disconnected :", socket.id);
        })

    },[])

    const sendMessage = (eventName,message) =>{
        socket.emit(eventName,message);
    }

    const receiveMessage = (eventName,callback)=>{
        socket.on(eventName,callback);
    }

  return (
    <SocketContext1.Provider value={{sendMessage,receiveMessage,socket}}>
        {children}
    </SocketContext1.Provider>
  )
}

export default SocketContext
