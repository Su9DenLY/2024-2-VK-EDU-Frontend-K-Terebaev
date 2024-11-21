import '../../index.scss'
import SideBarHeader from "../common/sideBarHeader.jsx";
import ChatListMain from "./chatListMain.jsx";
import {useEffect, useRef, useState} from "react";
import AddChatButton from "./addChatButton.jsx";
import {ChatWorker} from "../../api/chat.js";
import useSWR from "swr";

export default function ChatList({section, setSection}) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    
    const [currentSearchText, setCurrentSearchText] = useState("");

    const scrollRef = useRef(null);
    const addChatButtonRef = useRef(null);
    const sectionRef = useRef(null);

    const fetcher = () => ChatWorker.getChats().then(r => r.data.results)

    const {data: chats} = useSWR(
        "chats",
        fetcher,
        {
            fallbackData: [],
            revalidateOnFocus: true,
            refreshInterval: 300,
        }
    )

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
    //         if (scrollTop + clientHeight >= scrollHeight) {
    //         }
    //     };
    //
    //     const ref = scrollRef.current;
    //     ref.addEventListener("scroll", handleScroll);
    //
    //     return () => ref.removeEventListener("scroll", handleScroll);
    // }, [scrollPosition, currentPage, nextPage, loading]);

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
                scrollRef.current?.removeEventListener('scroll', handleScroll);
            };
        } else {
            const section = sectionRef.current

            const onMouseEnter = () => {
                addChatButtonRef.current.classList.remove('invisibleAddChatButton');
                addChatButtonRef.current.classList.add('visibleAddChatButton');
            }

            const onMouseLeave = () => {
                addChatButtonRef.current.classList.remove('visibleAddChatButton');
                addChatButtonRef.current.classList.add('invisibleAddChatButton');
            }

            section.addEventListener('mouseenter', onMouseEnter)
            section.addEventListener('mouseleave', onMouseLeave)

            return () => {
                section?.removeEventListener('mouseenter', onMouseEnter)
                section?.removeEventListener('mouseleave', onMouseLeave)
            }
        }
    }, [scrollPosition, prevScrollPosition, window.innerWidth]);


    return (
        <div className="wrapper-sidebar" ref={sectionRef}>
            <SideBarHeader section={section}
                           setSection={setSection}
                           searchText={currentSearchText}
                           setCurrentSearchText={setCurrentSearchText}
            />
            <ChatListMain chatsToShow={chats} currentSearchText={currentSearchText} ref={scrollRef}/>
            <AddChatButton ref={addChatButtonRef} setSection={setSection}/>
        </div>
    )
}
