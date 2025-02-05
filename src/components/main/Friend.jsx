import React, {useEffect} from 'react';
import "@/styles/main/friend.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Friend = () => {
    const [friends, setFriends] = React.useState([])
    const [reqs, setReqs] = React.useState([])
    const [receives, setReceives] = React.useState([])
    const navigate = useNavigate();
    const [findUser, setFindUser] = React.useState("")

    const setFriendsHandler = async () => {
        try {
            const response = await axios.get('http://localhost:8080/friend', {withCredentials: true});
            setFriends(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    const setReqsHandler = async () => {
        try {
            const response = await axios.get('http://localhost:8080/request', {withCredentials: true});
            setReqs(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    const setReceiveHandler = async () => {
        try {
            const response = await axios.get('http://localhost:8080/receive', {withCredentials: true});
            setReceives(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await setFriendsHandler()
                await setReqsHandler()
                await setReceiveHandler()
            } catch (e) {
                console.error(e);
                navigate("/login")
            }
        }
        fetchData();
    }, [navigate]);

    const friendReqHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8080/friend/request/${findUser}`, { withCredentials: true });
            await setReceiveHandler()
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="friend_container">
            {friends.map((friend, i) => (
                <div key={i} className="friend-item">
                    <div className="friend-icon" style={{
                        backgroundImage: `url(${friend.profileURL})`
                    }}>
                        <div className="friend-status" style={{backgroundColor: `${
                            friend.online ? "#54ff3c" : "#ff0000"}`}}/>
                    </div>
                    <div className="friend_name">{friend.name}</div>
                </div>
            ))}
        </div>
    );
};

export default Friend;