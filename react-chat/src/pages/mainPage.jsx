import ChatList from "../components/chatList/chatList.jsx";
import ChatRoom from "../components/chatRoom/chatRoom.jsx";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";

export default function MainPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {id: chatId} = useParams();

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
                    <Outlet/>
                </> : chatId > 0 ? <ChatRoom/> : <ChatList/>
            }
        </div>
    )
}
