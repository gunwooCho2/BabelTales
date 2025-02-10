import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useWebSocket} from "@/context/WebSocketContext.jsx";
import "@/styles/main/friend.scss"

const Friend = () => {
    const [friends, setFriends] = useState([]);
    const [reqFriends, setReqFriends] = useState([]);
    const [receiveFriends, setReceiveFriends] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const stompClient = useWebSocket();

    const getDataSkeleton = async (url, setData) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}:8080/${url}`, { withCredentials: true });
            setData(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    const additionDataSkeleton = (stomp, url, setData) => {
        console.log(`/user/topic/${url}/addition`);
        return stomp.subscribe(`/user/topic/${url}/addition`, (msg) => {
            if (msg && msg.body) {
                const receivedMessage = JSON.parse(msg.body);
                console.log("addition", receivedMessage);
                setData((prev) => [...prev, receivedMessage]);
            } else {
                alert("API 서버 상태가 불안정합니다.");
            }
        });
    };

    const removeDataSkeleton = (stomp, url, setData) => {
        console.log(`/user/topic/${url}/remove`);
        return stomp.subscribe(`/user/topic/${url}/remove`, (msg) => {
            if (msg && msg.body) {
                const receivedMessage = JSON.parse(msg.body);
                console.log("delete", receivedMessage);
                setData((prev) => prev.filter(item => item.friendNo !== receivedMessage));
            } else {
                alert("API 서버 상태가 불안정합니다.");
            }
        });
    };

    const getFriends = async () => getDataSkeleton("friend", setFriends);
    const subscribeFriendAddition = (stomp) => additionDataSkeleton(stomp, "friend", setFriends);
    const subscribeFriendRemoval = (stomp) => removeDataSkeleton(stomp, "friend", setFriends);
    const getReqFriends = async () => getDataSkeleton("friend/request", setReqFriends);
    const subscribeReqFriendAddition = (stomp) => additionDataSkeleton(stomp, "friend/request", setReqFriends);
    const subscribeReqFriendRemoval = (stomp) => removeDataSkeleton(stomp, "friend/request", setReqFriends);
    const getReceiveFriends = async () => getDataSkeleton("friend/receive", setReceiveFriends);
    const subscribeReceiveFriendAddition = (stomp) => additionDataSkeleton(stomp, "friend/receive", setReceiveFriends);
    const subscribeReceiveFriendRemoval = (stomp) => removeDataSkeleton(stomp, "friend/receive", setReceiveFriends);

    useEffect(() => {
        getFriends();
        getReqFriends();
        getReceiveFriends();

        const subscriptions = [];
        if (stompClient) {
            subscriptions.push(subscribeFriendAddition(stompClient));
            subscriptions.push(subscribeFriendRemoval(stompClient));
            subscriptions.push(subscribeReqFriendAddition(stompClient));
            subscriptions.push(subscribeReqFriendRemoval(stompClient));
            subscriptions.push(subscribeReceiveFriendAddition(stompClient));
            subscriptions.push(subscribeReceiveFriendRemoval(stompClient));

            stompClient.subscribe(`/user/topic/errors`, (msg) => {
                alert(msg);
            });
        }

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe && sub.unsubscribe());
        };
    }, [stompClient]);


    const searchUserChangeHandler =  async (e) => {
        const value = e.target.value.trim();
        if (value !== "") {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL}/user/searchUser/${value}`, { withCredentials: true });
                setSearchUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        else setSearchUsers([]);
    }

    const requestFriendHandler = useCallback((userNo) => {
        if (stompClient) {
            stompClient.send(`/app/friend/request/${userNo}`, {}, "");
        }
    }, [stompClient]);

    const receiveFriendHandler = useCallback((accept, userNo) => {
        const data = {
            userNo: userNo,
            accept: accept,
        }
        stompClient.send(`/app/friend/receive`, {}, JSON.stringify(data));
    }, [stompClient])

    const deleteFriendHandler = useCallback((friendNo) => {
        stompClient.send(`/app/friend/delete/${friendNo}`, {}, "");
    }, [stompClient])

    return (
        <div className="friend_container">
            <div className="searchUser">
                <input type="text" placeholder="유저 찾기" onChange={searchUserChangeHandler} />
                {searchUsers.map((user, i) =>
                    <div key={i} className="searchUser_result">
                        <div className="icon" style={{backgroundImage: `url(${user.icon})`}}></div>
                        <div className="name">{user.name}</div>
                        <div className="f_btn" onClick={() => requestFriendHandler(user.userNo)}>요청</div>
                    </div>
                )}
            </div>
            <div className="friends_header">
                친구 목록
            </div>
            {friends.map((friend, i) =>
                <div key={i} className="friend_item">
                    <div className="icon" style={{backgroundImage: `url(${friend.icon})`}}></div>
                    <div className="name">{friend.name}</div>
                    <div className="f_btn" onClick={() => deleteFriendHandler(friend.friendNo)}>삭제</div>
                </div>
            )}
            <div className="friends_header">
                친구 요청 받은 목록
            </div>
            {receiveFriends.map((friend, i) =>
                <div key={i} className="friend_item">
                    <div className="icon" style={{backgroundImage: `url(${friend.profileURL})`}}></div>
                    <div className="name">{friend.name}</div>
                    <div className="accept_btn f_btn" onClick={() => receiveFriendHandler(true, friend.friendNo)}>수락</div>
                    <div className="refusal_btn f_btn" onClick={() => receiveFriendHandler(false, friend.friendNo)}>거절</div>
                </div>
            )}
            <div className="friends_header">
                친구 요청 한 목록
            </div>
            {reqFriends.map((friend, i) =>
                <div key={i} className="friend_item">
                    <div className="icon" style={{backgroundImage: `url(${friend.profileURL})`}}></div>
                    <div className="name">{friend.name}</div>
                    {friend.status === "REJECTED" ?
                        <div className="refusal_btn f_btn">거절됨</div> : <></>}
                </div>
            )}
        </div>
    );
};

export default Friend;
