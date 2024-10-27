import '@/assets/styles/chat.scss'
import {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";

export default function ChatContainer({
                                          chatId,
                                          recipientName,
                                          lastMessageText,
                                          lastMessageTime,
                                          lastMessageCheck,
                                          setChatId
                                      }) {
    const {base} = useContext(AppContext);
    return (
        <li className="chat-container" id={chatId} onClick={() => {
            setChatId(chatId)
        }
        }>
            <div className="chat-avatar">
                <img src={`${base}/cat.jpg`} className="chat-avatar" alt="avatar"/>
            </div>
            <div className="chat-info">
                <div className="chat-info-row">
                    <span className="chat-name">{recipientName}</span>
                    <div className="chat-last-message-meta">
                        <span className="chat-last-message-check">{lastMessageCheck}</span>
                        <span className="chat-last-message-time">{lastMessageTime}</span>
                    </div>
                </div>
                <span className="chat-last-message">{lastMessageText}</span>
            </div>
        </li>
    );
}
