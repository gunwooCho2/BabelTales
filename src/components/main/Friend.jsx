import React, {useEffect} from 'react';
import "@/styles/main/friend.scss"

const Friend = () => {
    const [friends, setFriends] = React.useState([])
    const dummyData = [
        {
            "friend_online": "online",
            "friend_name": "Alice"
        },
        {
            "friend_online": "offline",
            "friend_name": "Bob"
        },
        {
            "friend_online": "away",
            "friend_name": "Charlie"
        },
        {
            "friend_online": "online",
            "friend_name": "David"
        },
        {
            "friend_online": "offline",
            "friend_name": "Emma"
        },
        {
            "friend_online": "away",
            "friend_name": "Frank"
        },
        {
            "friend_online": "online",
            "friend_name": "Grace"
        },
        {
            "friend_online": "offline",
            "friend_name": "Henry"
        },
        {
            "friend_online": "away",
            "friend_name": "Ivy"
        },
        {
            "friend_online": "online",
            "friend_name": "Jack"
        }
    ]

    useEffect(() => {
        setFriends(() => dummyData);
    }, []);

    return (
        <div className="friend_container">
            {friends.map((friend, i) => (
                <div key={i} className="friend-item">
                    <div className="friend_status" style={{backgroundColor:friend.friend_online === "online" ? "green" : friend.friend_online === "offline" ? "gray" : "red"}}></div>
                    <div className="friend_name">{friend.friend_name}</div>
                </div>
            ))}
        </div>
    );
};

export default Friend;