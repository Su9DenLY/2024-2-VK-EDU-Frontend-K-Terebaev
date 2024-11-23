import React, {createContext, useState} from 'react';


export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [recipientData, setRecipientData] = useState({});

    return (
        <AppContext.Provider value={{
            recipientData,
            setRecipientData,
            setCurrentUser,
            currentUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};
