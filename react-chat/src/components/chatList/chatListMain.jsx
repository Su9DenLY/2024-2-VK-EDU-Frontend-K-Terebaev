import CheckIcon from '@mui/icons-material/Check';
import ChatContainer from "./chatContainer.jsx";
import '@/assets/styles/section.scss'
import {forwardRef} from "react";
import {NavLink} from "react-router-dom";
import {pathConfig} from "../../configs/path.config.js";

const setActive = ({isActive}) => isActive ? 'chat-container-active' : 'chat-container-inactive';

const ChatListMain = forwardRef(({setChatId, chatsToShow, users, userId}, scrollRef) => {
    return (
        <ul className="section-chats" ref={scrollRef}>
            {chatsToShow?.map((chatItem, index) => {
                const recipientId = chatItem.users.find(id => id !== userId);
                const recipient = users.find(userItem => userItem.id === recipientId);
                const recipientName = recipient ? recipient.fullname : 'Unknown';
                const lastMessage = chatItem.messages.slice(-1)[0];

                return (
                    <NavLink key={index} to={pathConfig.chatsPath + `/${chatItem.id}`} className={setActive}>
                        <ChatContainer
                            key={chatItem.id}
                            chatId={chatItem.id}
                            recipientName={recipientName}
                            lastMessageText={lastMessage?.text || ''}
                            lastMessageTime={lastMessage?.time || ''}
                            lastMessageCheck={lastMessage && lastMessage?.senderId !== recipientId ? <CheckIcon/> : ''}
                            setChatId={setChatId}
                        />
                    </NavLink>
                );
            })}
        </ul>
    )
})

export default ChatListMain
