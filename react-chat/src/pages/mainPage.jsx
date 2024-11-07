import ChatList from "../components/chatList/chatList.jsx";
import ChatRoom from "../components/chatRoom/chatRoom.jsx";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import Profile from "../components/profile/profile.jsx";

export const Sections = {
    chats: 'chats',
    profile: 'profile',
}

export default function MainPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {id: chatId} = useParams();
    const [section, setSection] = useState(Sections.chats);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })
    const sectionComponents = {
        chats: <ChatList setSection={setSection}/>,
        profile: <Profile setSection={setSection}/>,
    }
    return (
        <div className="wrapper">
            {
                windowWidth > 700 ? <>
                    {sectionComponents[section]}
                    <Outlet/>
                </> : chatId > 0 ? <ChatRoom/> : <>{sectionComponents[section]}</>
            }
        </div>
    )
}
