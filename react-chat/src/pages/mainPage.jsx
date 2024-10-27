import ChatList from "../components/chatList/chatList.jsx";
import ChatRoom from "../components/chatRoom/chatRoom.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../AppContext.jsx";

export default function MainPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {chatId} = useContext(AppContext);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })

    return (
        <div className="wrapper">
            {
                windowWidth > 700 ? <>
                    <ChatList/>
                    <ChatRoom/>
                </> : chatId > 0 ? <ChatRoom/> : <ChatList/>
            }
        </div>
    )
}
