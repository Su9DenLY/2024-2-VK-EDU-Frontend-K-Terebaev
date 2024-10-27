import CheckIcon from '@mui/icons-material/Check';
import ChatContainer from "./chatContainer.jsx";
import '@/assets/styles/section.scss'
import {forwardRef} from "react";

const ChatListMain = forwardRef(({setChatId, chatsToShow, users, userId}, scrollRef) => {
    return (
        <ul className="section-chats" ref={scrollRef}>
            {chatsToShow?.map(chatItem => {
                const recipientId = chatItem.users.find(id => id !== userId);
                const recipient = users.find(userItem => userItem.id === recipientId);
                const recipientName = recipient ? recipient.username : 'Unknown';
                const lastMessage = chatItem.messages.slice(-1)[0];

                return (
                    <ChatContainer
                        key={chatItem.id}
                        chatId={chatItem.id}
                        recipientName={recipientName}
                        lastMessageText={lastMessage?.text || ''}
                        lastMessageTime={lastMessage?.time || ''}
                        lastMessageCheck={lastMessage && lastMessage?.senderId !== recipientId ? <CheckIcon/> : ''}
                        setChatId={setChatId}
                    />
                );
            })}
        </ul>
    )
})

export default ChatListMain
