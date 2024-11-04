import {useContext, useEffect} from 'react'
import './index.scss'
import {AppContext} from "./AppContext.jsx";
import LoginPage from "./pages/loginPage.jsx";
import MainPage from "./pages/mainPage.jsx";
import {pathConfig} from "./configs/path.config.js";
import {Route, Routes} from "react-router-dom";
import EmptyChatRoom from "./components/chatRoom/emptyChatRoom.jsx";
import ChatRoom from "./components/chatRoom/chatRoom.jsx";
import {initialUsers, initialChats } from "./initialData/initialData.js";

function App() {
    const {chats, users, setChats, setUsers} = useContext(AppContext)

    useEffect(() => {
        if (users.length === 0 && chats.length === 0) {
            setChats(initialChats)
            setUsers(initialUsers)
        }
    }, []);

    return <>
        <Routes>
            <Route path={pathConfig.basePath} element={<LoginPage/>}/>
            <Route path={pathConfig.chatsPath} element={<MainPage/>}>
                <Route index element={<EmptyChatRoom/>}/>
                <Route path={pathConfig.concatPath('/chats/:id')} element={<ChatRoom/>}/>
            </Route>
        </Routes>
    </>
}

export default App
