import NavBar from "./components/nav/NavBar.jsx";
import Main from "./components/main/Main.jsx";
import {useContext, useState} from "react";
import "./styles/App.scss"
import {ModalContext} from "@/context/ModalContext.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    const [menu, setMenu] = useState(<></>);
    const [tooltip, setTooltip] = useState(<></>);
    const [navSideActive, setNavSideActive] = useState(false);
    const {modal, updateModal} = useContext(ModalContext);

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

  return (
      <>
          <div className="total" onClick={(e) => clear(e)}>
              <NavBar createMenu={createMenu} createTooltip={createTooltip} setNavSideActive={setNavSideActive}/>
              <Routes>
                  <Route path="/" element={<Main/>} />
              </Routes>
              <Routes>
                  <Route path="/t" element={<Main/>} />
              </Routes>
              <Routes>
                  <Route path="/r" element={<Main/>} />
              </Routes>
              <div className={`menu-container ${navSideActive ? "menu-container-side-active" : ""}`}>
                  {menu}
              </div>
              <div className={`tooltip-container ${navSideActive ? "tooltip-container-side-active" : ""}`}>
                  {tooltip}
              </div>
          </div>
          {modal}
      </>
  )
}

export default App
