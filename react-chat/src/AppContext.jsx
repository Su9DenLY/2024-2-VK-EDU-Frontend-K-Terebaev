import React, {createContext, useState, useEffect} from 'react';


export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('chats')) || []);
    const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
    const [currentUserId, setCurrentUserId] = useState(() => JSON.parse(localStorage.getItem('userId')));
    const [chatId, setChatId] = useState(0)
    const [base] = useState("/2024-2-VK-EDU-Frontend-K-Terebaev")

    useEffect(() => {
        chats.length > 0 && localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        users.length > 0 && localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUserId) {
            localStorage.setItem('userId', currentUserId.toString());
        } else {
            localStorage.removeItem('userId');
        }
    }, [currentUserId]);

    return (
        <AppContext.Provider value={{
            chats,
            setChats,
            chatId,
            setChatId,
            users,
            setUsers,
            currentUserId,
            setCurrentUserId,
            base
        }}>
            {children}
        </AppContext.Provider>
    );
};
