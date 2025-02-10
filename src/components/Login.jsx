import React, {useEffect} from 'react';
import "@/styles/login.scss"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [containerStyle, setContainerStyle] = React.useState("right-panel-active");
    const [inputData, setInputData] = React.useState({
        ID: "",
        password: "",
        name: "",
    });
    const [duplicateData, setDuplicateData] = React.useState({
        userID: false,
        userName: false,
    });

    const idChangeHandler = (e) => {
        setInputData({...inputData, ID: e.target.value});
    }
    const passwordChangeHandler = (e) => {
        setInputData({...inputData, password: e.target.value});
    }
    const nameChangeHandler = (e) => {
        setInputData({...inputData, name: e.target.value});
    }

    const dataClear = () => {
        setInputData({
            ID: "",
            password: "",
            name: "",
        })
        setDuplicateData({
            userID: false,
            userName: false,
        })
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        const data = {
            userID: inputData.ID.trim(),
            userPassword: inputData.password.trim(),
            userName: inputData.name.trim(),
        }

        if (data.userID === "" || data.userPassword === "" || data.userName === "") {
            alert("data is empty!");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL}/user/register`, data);
            if (!response.data.userID && !response.data.userName) navigate('/login')
            else setDuplicateData(response.data);
        } catch(error) {
            console.error(error);
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        const data = {
            userID: inputData.ID.trim(),
            userPassword: inputData.password.trim(),
        }

        if (data.userID === "" || data.userPassword === "") {
            alert("data is empty!");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL}/user/login`, data, { withCredentials: true });
            navigate('/')
            window.location.reload();
        } catch(error) {
            console.error(error);
            alert("login failed!")
        }
    }

    useEffect(() => {
        setContainerStyle(location.pathname === "/login" ? "" : "right-panel-active");
    }, [])

    return (
        <div className="body_login">
            <div className={`container ${containerStyle}`}>
                <div className="container__form container--signup">
                    <form className="form" id="form1">
                        <h2 className="form__title">Sign Up</h2>
                        <input type="text" value={inputData.ID} placeholder={`${duplicateData.userID ? "duplicate" : "ID"}`} onChange={(e) => idChangeHandler(e)} className="input"/>
                        <input type="password" value={inputData.password} placeholder="password" className="input" onChange={(e) => passwordChangeHandler(e)}/>
                        <input type="text" value={inputData.name} placeholder={`${duplicateData.userName ? "duplicate" : "name"}`} onChange={(e) => nameChangeHandler(e)} className="input"/>
                        <button className="btn" onClick={(e) => registerHandler(e)}>Sign Up</button>
                    </form>
                </div>
                <div className="container__form container--signin">
                    <form className="form" id="form2">
                        <h2 className="form__title">Sign In</h2>
                        <input type="text" value={inputData.ID} placeholder="ID" className="input" onChange={(e) => idChangeHandler(e)}/>
                        <input type="password" value={inputData.password} placeholder="password" className="input" onChange={(e) => passwordChangeHandler(e)}/>
                        <a href="#" className="link">Forgot your password?</a>
                        <button className="btn" onClick={(e) => loginHandler(e)}>Sign In</button>
                    </form>
                </div>
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn" id="signIn" onClick={() => {
                                setContainerStyle("")
                                dataClear()
                            }}>Sign In</button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn" id="signUp" onClick={() => {
                                setContainerStyle("right-panel-active")
                                dataClear()
                            }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;