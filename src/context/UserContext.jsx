import React, {createContext, useState} from 'react';

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        userToken:0,
        profileURL:"",
        userName:""
    });
    const updateUser = (updater) => {
        setUserData(prev => updater(prev))
    }

    return (
        <UserContext.Provider value={{userData, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}