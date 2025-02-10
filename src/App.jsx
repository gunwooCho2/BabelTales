import NavBar from "./components/nav/NavBar.jsx";
import Main from "./components/main/Main.jsx";
import {useContext, useEffect, useState} from "react";
import "./styles/App.scss"
import {ModalContext} from "@/context/ModalContext.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import TRPGMain from "@/components/main/TRPGMain.jsx";
import Login from "@/components/Login.jsx";
import {UserContext} from "@/context/UserContext.jsx";
import axios from "axios";
import {WebSocketProvider} from "@/context/WebSocketContext.jsx";

function App() {
    const [menu, setMenu] = useState(<></>);
    const [tooltip, setTooltip] = useState(<></>);
    const [navSideActive, setNavSideActive] = useState(false);
    const {modal, updateModal} = useContext(ModalContext);
    const {userData, updateUser} = useContext(UserContext);

    const createMenu = (e, component) => {
        setTimeout(() => {
            setMenu(component);
        }, 0);
    }
    const createTooltip = (component) => {
        setTooltip(component);
    }

    const clear = (e) => {
        if (!e.target.closest(".nav-menu") ) {
            setMenu(<></>);
        }
    }

    const setMainPage = (component) => {
        return <>
            <div className="total" onClick={(e) => clear(e)}>
                <NavBar createMenu={createMenu} createTooltip={createTooltip} setNavSideActive={setNavSideActive}/>
                {component}
                <div className={`menu-container ${navSideActive ? "menu-container-side-active" : ""}`}>
                    {menu}
                </div>
                <div className={`tooltip-container ${navSideActive ? "tooltip-container-side-active" : ""}`}>
                    {tooltip}
                </div>
            </div>
            {modal}
        </>
    }

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Login/>}/>
                <Route path="/" element={setMainPage(<Main R={false} />)} />
                <Route path="/t" element={setMainPage(<TRPGMain />)} />
                <Route path="/r" element={setMainPage(<Main R={true} />)} />
          </Routes>
      </>
  )
}

export default App
