import React, {createContext, useState} from 'react';

export const UpdateContext = createContext()

export const UpdateProvider = ({children}) => {
    const [reRender, setReRender] = useState({
        navbar: () => {},
        main: () => {}
    });
    const updateComponent = (updater) => {
        setReRender(prev => updater(prev))
    }

    return (
        <UpdateContext.Provider value={{reRender, updateComponent}}>
            {children}
        </UpdateContext.Provider>
    )
}