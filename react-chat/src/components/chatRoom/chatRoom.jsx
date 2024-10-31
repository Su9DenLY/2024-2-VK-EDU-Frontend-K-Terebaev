import ChatRoomHeader from "./chatRoomHeader.jsx";
import "../../index.scss"
import {AppContext} from "../../AppContext.jsx";
import {useContext, useEffect, useState} from "react";
import ChatRoomMessages from "./chatRoomMessages.jsx";
import ChatForm from "./chatForm.jsx";

export default function ChatRoom() {
    const {chats, chatId, setChatId, users, currentUserId} = useContext(AppContext);

    const idRecipient = chats?.find(chat => chat?.id === chatId)?.users?.find(id => id !== currentUserId)
    const recipientData = users?.find(user => user?.id === idRecipient);
    const [messagesHistory, setMessagesHistory] = useState([])

    useEffect(() => {
        if (chatId > 0) {
            setMessagesHistory(chats?.find(chat => chat?.id === chatId)?.messages)
        } else {
            setMessagesHistory([])
        }
    }, [chats, chatId])
    
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setChatId(0)
            }
        })
    }, []);
    return (
        <div className="wrapper-chat-room">
            {
                chatId ? <>
                        <ChatRoomHeader recipientData={recipientData}/>
                        <ChatRoomMessages messagesHistory={messagesHistory}/>
                        <ChatForm/>
                    </>
                    : <div className='wrapper-chat-room-empty'>
                        <div className='wrapper-chat-room-empty-content'>
                            Выберите диалог
                        </div>
                    </div>
            }
        </div>
    )
}
