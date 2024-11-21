import ChatContainer from "./chatContainer.jsx";
import '@/assets/styles/section.scss'
import {forwardRef, useContext} from "react";
import {NavLink} from "react-router-dom";
import {pathConfig} from "../../configs/path.config.js";
import {AppContext} from "../../AppContext.jsx";

const setActive = ({isActive}) => isActive ? 'chat-container-active' : 'chat-container-inactive';

const ChatListMain = forwardRef(({chatsToShow, currentSearchText}, scrollRef) => {
    const {setRecipientData, currentUser} = useContext(AppContext);
    return (
        <ul className="section-chats" ref={scrollRef}>
            {chatsToShow?.map((chatItem, index) => {
                if (currentSearchText?.trim()) {
                    if (chatItem?.title.toLowerCase().includes(currentSearchText.toLowerCase())) {
                        return (
                            <NavLink key={index} to={pathConfig.chatsPath + `/${chatItem.id}`} className={setActive}
                                     onClick={() => setRecipientData(chatItem.members.filter(item => item.id !== currentUser.id)[0])}>
                                <ChatContainer key={chatItem.id} chatItem={chatItem}/>
                            </NavLink>
                        );
                    }
                } else {
                    return (
                        <NavLink key={index} to={pathConfig.chatsPath + `/${chatItem.id}`} className={setActive}
                                 onClick={() => setRecipientData(chatItem.members.filter(item => item.id !== currentUser.id)[0])}>
                            <ChatContainer key={chatItem.id} chatItem={chatItem}/>
                        </NavLink>
                    );
                }

            })}
        </ul>
    )
})

export default ChatListMain
