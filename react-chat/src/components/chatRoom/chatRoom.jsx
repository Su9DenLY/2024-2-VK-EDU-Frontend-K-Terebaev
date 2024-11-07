import ChatRoomHeader from "./chatRoomHeader.jsx";
import "../../index.scss"
import {AppContext} from "../../AppContext.jsx";
import {useContext, useEffect, useState} from "react";
import ChatRoomMessages from "./chatRoomMessages.jsx";
import ChatForm from "./chatForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {pathConfig} from "../../configs/path.config.js";

export default function ChatRoom() {
    const {chats, users, currentUserId} = useContext(AppContext);
    const [recipientData, setRecipientData] = useState(null);
    const {id: chatId} = useParams()
    const navigate = useNavigate()
    const [messagesHistory, setMessagesHistory] = useState([])

    useEffect(() => {
        const idRecipient = chats?.find(chat => chat?.id === parseInt(chatId))?.users?.find(id => id !== currentUserId)
        const recipientData = users?.find(user => user?.id === idRecipient);
        setRecipientData(recipientData)
        setMessagesHistory(chats?.find(chat => chat?.id === parseInt(chatId))?.messages)
    }, [chats, chatId])

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navigate(pathConfig.chatsPath)
            }
        })
    }, []);
    return (
        <div className="wrapper-chat-room">
            <ChatRoomHeader recipientData={recipientData}/>
            <ChatRoomMessages messagesHistory={messagesHistory}/>
            <ChatForm/>
        </div>
    )
}
