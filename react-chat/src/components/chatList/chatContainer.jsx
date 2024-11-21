import '@/assets/styles/chat.scss'
import AvatarImage from "../common/avatarImage.jsx";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CheckIcon from "@mui/icons-material/Check";
import React, {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";
import {formatDate} from "../../utils/lib.js";

export default function ChatContainer({chatItem}) {
    const {currentUser} = useContext(AppContext);
    return (
        <li className="chat-container" id={chatItem?.id}>
            <div className="chat-avatar">
                <AvatarImage userItem={chatItem}/>
            </div>
            <div className="chat-info">
                <div className="chat-info-row">
                    <span className="chat-name">{chatItem?.title}</span>
                    <div className="chat-last-message-meta">
                        <span className="chat-last-message-check">{
                            chatItem?.last_message?.sender?.id === currentUser?.id ? chatItem?.last_message?.was_read_by.length > 0 ?
                                <DoneAllIcon className='message-status-check'/> :
                                <CheckIcon className='message-status-check'/> : ''
                        }</span>
                        <span className="chat-last-message-time">{formatDate(chatItem?.updated_at, 'time')}</span>
                    </div>
                </div>
                <span className="chat-last-message">{chatItem?.last_message?.text || ''}</span>
            </div>
        </li>
    );
}
