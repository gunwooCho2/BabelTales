import React, {createContext, useState} from 'react';

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [modal, setModal] = useState(undefined);
    const updateModal = (component) => {
        setModal(component)
    }
    return (
        <ModalContext.Provider value={{modal, updateModal}}>
            {children}
        </ModalContext.Provider>
    )
}