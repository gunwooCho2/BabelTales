import NavBar from "./components/nav/NavBar.jsx";
import Main from "./components/main/Main.jsx";
import { useState} from "react";
import "./styles/App.scss"
import NavMenu from "./components/nav/NavMenu.jsx";

function App() {
    const [menu, setMenu] = useState(<></>);
    const [tooltip, setTooltip] = useState(<></>);
    const [navSideActive, setNavSideActive] = useState(false);

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
      <div className="total" onClick={(e) => clear(e)}>
          <NavBar createMenu={createMenu} createTooltip={createTooltip} setNavSideActive={setNavSideActive}/>
          <Main/>
          <div className="menu-container">
              {menu}
          </div>
          <div className={`tooltip-container ${navSideActive ? "tooltip-container-side-active" : ""}`}>
              {tooltip}
          </div>
      </div>
  )
}

export default App
