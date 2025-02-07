import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ModalProvider} from "@/context/ModalContext.jsx";
import { BrowserRouter } from 'react-router-dom';
import {UpdateProvider} from "@/context/UpdateContext.jsx";
import {UserProvider} from "@/context/UserContext.jsx";
import {WebSocketProvider} from "@/context/WebSocketContext.jsx";


createRoot(document.getElementById('root')).render(
      <ModalProvider>
          <UserProvider>
              <UpdateProvider>
                  <WebSocketProvider>
                      <BrowserRouter>
                          <App />
                      </BrowserRouter>
                  </WebSocketProvider>
              </UpdateProvider>
          </UserProvider>
      </ModalProvider>
)
