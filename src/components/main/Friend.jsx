import React, {useEffect} from 'react';
import "@/styles/main/friend.scss"

const Friend = () => {
    const [friends, setFriends] = React.useState([])
    const dummyData = [
        {
            icon:null,
            status: "online",
            name: "Alice"
        },
        {
            icon:null,
            status: "online",
            name: "Bob"
        },
        {
            icon:null,
            status: "online",
            name: "Charlie"
        },
        {
            icon:null,
            status: "away",
            name: "David"
        },
        {
            icon:null,
            status: "away",
            name: "Emma"
        },
        {
            icon:null,
            status: "away",
            name: "Frank"
        },
        {
            icon:null,
            status: "offline",
            name: "Grace"
        },
        {
            icon:null,
            status: "offline",
            name: "Henry"
        },
        {
            icon:null,
            status: "offline",
            name: "Ivy"
        },
        {
            icon:null,
            status: "offline",
            name: "Jack"
        }
    ]

    useEffect(() => {
        setFriends(() => dummyData);
    }, []);

    return (
        <div className="friend_container">
            {friends.map((friend, i) => (
                <div key={i} className="friend-item">
                    <div className="friend-icon" style={{
                        backgroundImage: `url(${friend.icon != null ? friend.icon : "https://cdn-icons-png.flaticon.com/512/880/880594.png"})`
                    }}>
                        <div className="friend-status" style={{backgroundColor: `${
                            friend.status === "online" ? "#54ff3c" : friend.status === "away" ? "#ff0000" : "#2b2b2b"}`}}/>
                    </div>
                    <div className="friend_name">{friend.name}</div>
                </div>
            ))}
        </div>
    );
};

export default Friend;