import ChatList from "../components/chatList/chatList.jsx";
import ChatRoom from "../components/chatRoom/chatRoom.jsx";
import {useContext, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import Profile from "../components/profile/profile.jsx";
import UsersList from "../components/usersList/usersList.jsx";
import {UserWorker} from "../api/user.js";
import {AppContext} from "../AppContext.jsx";

export const Sections = {
    chats: 'chats',
    users: 'users',
    profile: 'profile',
}

export default function MainPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {id: chatId} = useParams();
    const [section, setSection] = useState(Sections.chats);
    const {setCurrentUser} = useContext(AppContext);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await UserWorker.getUser('current')
            setCurrentUser(res.data)
        }
        fetchUserData()
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })
    const sectionComponents = {
        chats: <ChatList section={section} setSection={setSection}/>,
        users: <UsersList setSection={setSection}/>,
        profile: <Profile setSection={setSection}/>,
    }
    return (
        <div className="wrapper">
            {
                windowWidth > 700 ? <>
                    {sectionComponents[section]}
                    <Outlet/>
                </> : chatId ? <ChatRoom/> : <>{sectionComponents[section]}</>
            }
        </div>
    )
}
