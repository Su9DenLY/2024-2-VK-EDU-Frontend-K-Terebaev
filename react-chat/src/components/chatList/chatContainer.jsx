import '@/assets/styles/chat.scss'
import {pathConfig} from "../../configs/path.config.js";

export default function ChatContainer({
                                          chatId,
                                          recipientName,
                                          lastMessageText,
                                          lastMessageTime,
                                          lastMessageCheck,
                                          setChatId
                                      }) {
    return (
        <li className="chat-container" id={chatId} onClick={() => {
            setChatId(chatId)
        }
        }>
            <div className="chat-avatar">
                <img src={`${pathConfig.pathToIcons}/cat.jpg`} className="chat-avatar" alt="avatar"/>
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
