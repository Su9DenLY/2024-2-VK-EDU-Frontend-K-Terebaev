import './index.scss'
import AuthPage from "./pages/authPage.jsx";
import MainPage from "./pages/mainPage.jsx";
import {pathConfig} from "./configs/path.config.js";
import {Route, Routes} from "react-router-dom";
import EmptyChatRoom from "./components/chatRoom/emptyChatRoom.jsx";
import ChatRoom from "./components/chatRoom/chatRoom.jsx";
import TokenProvider from "./tokenProvider.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return <>
        <TokenProvider/>
        <Routes>
            <Route path={pathConfig.basePath} element={<AuthPage/>}/>
            <Route path={pathConfig.chatsPath} element={<MainPage/>}>
                <Route index element={<EmptyChatRoom/>}/>
                <Route path={pathConfig.concatPath('/chats/:id')} element={<ChatRoom/>}/>
            </Route>
        </Routes>
        <ToastContainer/>
    </>
}

export default App
