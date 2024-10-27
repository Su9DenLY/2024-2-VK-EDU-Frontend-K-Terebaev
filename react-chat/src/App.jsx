import {useContext, useEffect} from 'react'
import './index.scss'
import {AppContext} from "./AppContext.jsx";
import LoginPage from "./pages/loginPage.jsx";
import MainPage from "./pages/mainPage.jsx";

function App() {
    const {chats, users, setChats, setUsers, currentUserId} = useContext(AppContext)

    useEffect(() => {
        if (users.length === 0 && chats.length === 0) {
            const newChats = []
            const newUsers = []
            newUsers.push({'id': 1, 'username': 'Элизабет', 'chats': [1, 3]})
            newUsers.push({'id': 2, 'username': 'Дженнифер', 'chats': [1, 2, 4]})
            newUsers.push({'id': 3, 'username': 'Иннокентий', 'chats': [4]})
            newUsers.push({'id': 4, 'username': 'Евлампий', 'chats': [2, 3]})
            newChats.push({'id': 1, 'users': [1, 2], 'messages': []})
            newChats.push({'id': 2, 'users': [2, 4], 'messages': []})
            newChats.push({
                'id': 3, 'users': [1, 4], 'messages': [
                    {senderId: 1, text: "Ку1", time: "00:21"},
                    {senderId: 4, text: "Ку2", time: "00:21"},
                    {senderId: 1, text: "Ку3", time: "00:21"},
                    {senderId: 4, text: "Ку4", time: "00:21"},
                    {senderId: 1, text: "Ку5", time: "00:21"},
                    {senderId: 4, text: "Ку6", time: "00:21"},
                    {senderId: 1, text: "Ку7", time: "00:21"},
                    {senderId: 4, text: "Ку8", time: "00:21"},
                    {senderId: 1, text: "Ку9", time: "00:21"},
                    {senderId: 4, text: "Ку0", time: "00:21"},
                    {senderId: 1, text: "Ку10", time: "00:21"},
                    {senderId: 4, text: "Ку11", time: "00:21"},
                ]
            })
            newChats.push({'id': 4, 'users': [2, 3], 'messages': []})
            setChats(newChats)
            setUsers(newUsers)
        }
    }, []);

    return (
        currentUserId ? <MainPage/> : <LoginPage/>
    )
}

export default App
