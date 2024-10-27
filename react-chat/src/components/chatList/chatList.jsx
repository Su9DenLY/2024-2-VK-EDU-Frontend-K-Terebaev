import '../../index.scss'
import ChatListHeader from "./chatListHeader.jsx";
import ChatListMain from "./chatListMain.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../AppContext.jsx";
import AddChatButton from "./addChatButton.jsx";

export default function ChatList() {
    const {chats, users, currentUserId, setChatId} = useContext(AppContext);

    const [chatsToShow, setChatsToShow] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    const scrollRef = useRef(null);
    const addChatButtonRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const chatIds = users?.find(userItem => userItem?.id === currentUserId)?.chats
        setChatsToShow(chats?.filter(chatItem => chatIds?.includes(chatItem?.id)))
    }, [chats]);

    useEffect(() => {
        if (window.innerWidth <= 700) {
            const handleScroll = () => {
                const currentScroll = scrollRef.current.scrollTop;

                if (prevScrollPosition > currentScroll) {
                    addChatButtonRef.current.classList.remove('invisibleAddChatButton');
                    addChatButtonRef.current.classList.add('visibleAddChatButton');
                } else {
                    addChatButtonRef.current.classList.remove('visibleAddChatButton');
                    addChatButtonRef.current.classList.add('invisibleAddChatButton');
                }

                setPrevScrollPosition(scrollPosition);
                setScrollPosition(currentScroll);
            };

            scrollRef.current.addEventListener('scroll', handleScroll);

            return () => {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            };
        } else {
            const section = sectionRef.current

            section.addEventListener('mouseenter', () => {
                addChatButtonRef.current.classList.remove('invisibleAddChatButton');
                addChatButtonRef.current.classList.add('visibleAddChatButton');
            });
            section.addEventListener('mouseleave', () => {
                addChatButtonRef.current.classList.remove('visibleAddChatButton');
                addChatButtonRef.current.classList.add('invisibleAddChatButton');
            })
        }
    }, [scrollPosition, prevScrollPosition, window.innerWidth]);


    return (
        <div className="wrapper-chat-list" ref={sectionRef}>
            <ChatListHeader/>
            <ChatListMain setChatId={setChatId} chatsToShow={chatsToShow} users={users} userId={currentUserId}
                          ref={scrollRef}/>
            <AddChatButton ref={addChatButtonRef}/>
        </div>
    )
}
