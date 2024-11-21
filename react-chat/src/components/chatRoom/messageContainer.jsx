import React, {forwardRef, useContext, useEffect, useRef} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import "@/assets/styles/message.scss";
import {AppContext} from "../../AppContext.jsx";
import {formatDate} from "../../utils/lib.js";
import {ChatWorker} from "../../api/chat.js";

const MessageContainer = forwardRef(({message}, ref) => {
    const {currentUser} = useContext(AppContext);

    const messageContainerClass = message.sender.id === currentUser?.id ? "message-my-container" : "message-other-container";
    const messageUsernameClass = message.sender.id === currentUser?.id ? "message-my-username" : "message-other-username";
    const messageContentClass = message.sender.id === currentUser?.id ? "message-my-content" : "message-other-content";
    const messageRef = useRef(null);
    useEffect(() => {
        if (currentUser) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && message.was_read_by.length < 2 && message.sender.id !== currentUser?.id) {
                        ChatWorker.markMessageAsRead(message.id)
                    }
                },
                {threshold: 1.0}
            );

            if (messageRef.current) {
                observer.observe(messageRef.current);
            }

            return () => {
                if (messageRef.current) {
                    observer.unobserve(messageRef.current);
                }
            };
        }
    }, [currentUser]);

    return (
        <li ref={ref} className={messageContainerClass}>
            <div ref={messageRef} className={messageUsernameClass}>
                {message.sender.first_name}
            </div>
            <div className={messageContentClass}>
                {message?.text}
                <div className="message-status">
                    {formatDate(message?.created_at, 'time')}
                    {
                        message.sender.id === currentUser?.id ? message.was_read_by.length > 0 ?
                            <DoneAllIcon className='message-status-check'/> :
                            <CheckIcon className='message-status-check'/> : ''
                    }
                </div>
            </div>
        </li>
    );
});

export default MessageContainer;
