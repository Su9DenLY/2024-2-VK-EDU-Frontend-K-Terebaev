import React, {forwardRef, useContext} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import "@/assets/styles/message.scss";
import {AppContext} from "../../AppContext.jsx";

const MessageContainer = forwardRef(({message}, ref) => {
    const {users, currentUserId} = useContext(AppContext);

    const senderUsername = users.find(userItem => userItem.id === message.senderId).username
    
    const messageContainerClass = message.senderId === currentUserId ? "message-my-container" : "message-other-container";
    const messageUsernameClass = message.senderId === currentUserId ? "message-my-username" : "message-other-username";
    const messageContentClass = message.senderId === currentUserId ? "message-my-content" : "message-other-content";
    
    return (
        <li ref={ref} className={messageContainerClass}>
            <div className={messageUsernameClass}>
                {senderUsername}
            </div>
            <div className={messageContentClass}>
                {message?.text}
                <div className="message-status">
                    {message?.time}
                    <CheckIcon className='test'/>
                </div>
            </div>
        </li>
    );
});

export default MessageContainer;
