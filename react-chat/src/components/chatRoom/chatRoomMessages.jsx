import MessageContainer from './messageContainer.jsx';
import "@/assets/styles/section.scss"
import {useEffect, useRef} from "react";

export default function ChatRoomMessages({messagesHistory}) {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messagesHistory]);

    return (
        <main className="section">
            <ul className="section-messages">
                {messagesHistory?.map((message, index) => {
                        return (
                            <MessageContainer key={`${message.id}`}
                                              message={message}
                                              ref={index === messagesHistory.length - 1 ? lastMessageRef : null}
                            />)
                    }
                )
                }
            </ul>
        </main>
    )
}
