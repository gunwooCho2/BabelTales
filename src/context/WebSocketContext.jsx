// WebSocketProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from "sockjs-client";
import Stomp from 'stompjs';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS(`${import.meta.env.VITE_URL}/ws`);
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            console.log('웹소켓 연결 성공');
            setStompClient(stomp);
        }, (error) => {
            console.error('웹소켓 연결 실패:', error);
        });

        return () => {
            if (stomp && stomp.connected) {
                stomp.disconnect(() => {
                    console.log("웹소켓 연결 종료됨");
                });
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={stompClient}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
