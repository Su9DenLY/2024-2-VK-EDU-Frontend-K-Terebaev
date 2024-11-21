import {forwardRef} from "react";
import UserContainer from "./userContainer.jsx";
import "@/assets/styles/section.scss"
import ReactLoading from "react-loading";
import {ChatWorker} from "../../api/chat.js";
import {Sections} from "../../pages/mainPage.jsx";

const UsersListMain = forwardRef(({users, loading, myData, setSection}, ref) => {
    return (
        <>
            <ul className="section-users" ref={ref}>
                {users?.map((userItem) => {
                    const onClick = () => {
                        ChatWorker.createChat(userItem, myData)
                        setSection(Sections.chats)
                    }
                    return (
                        <UserContainer key={userItem.id}
                                       userItem={userItem}
                                       myData={myData}
                                       onClick={onClick}/>
                    )
                })}
                {loading ?
                    <ReactLoading type="spin" width={25} height={25} className="loader"
                                  color={"var(--primary-text-color)"}/> : null}
            </ul>
        </>
    )
})

export default UsersListMain
