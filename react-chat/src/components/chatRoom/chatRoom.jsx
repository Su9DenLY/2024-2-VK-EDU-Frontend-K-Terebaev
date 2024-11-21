import ChatRoomHeader from "./chatRoomHeader.jsx";
import "../../index.scss"
import {AppContext} from "../../AppContext.jsx";
import {useContext, useEffect} from "react";
import ChatRoomMessages from "./chatRoomMessages.jsx";
import ChatForm from "./chatForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {pathConfig} from "../../configs/path.config.js";
import {ChatWorker} from "../../api/chat.js";
import useSWR from "swr";

export default function ChatRoom() {
    const {setRecipientData, currentUser} = useContext(AppContext);
    const navigate = useNavigate()
    const {id} = useParams()

    const fetcher = () => ChatWorker.getMessages(id).then(r => r.data.results.reverse())

    const {data} = useSWR(
        id ? `messagesFetcher/${id}` : null,
        fetcher,
        {
            fallbackData: [],
            revalidateOnFocus: true,
            refreshInterval: 300,
        }
    )


    useEffect(() => {
        const getChatById = async () => {
            try {
                const res = await ChatWorker.getChatById(id);
                setRecipientData(res.data?.members?.filter(item => item.id !== currentUser.id && item.username !== currentUser.username)[0])
            } catch (error) {
                console.error(error)
            }
        }
        if (currentUser)
            getChatById();
    }, [currentUser]);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navigate(pathConfig.chatsPath)
            }
        })
    }, []);
    return (
        <div className="wrapper-chat-room">
            <ChatRoomHeader/>
            <ChatRoomMessages messagesHistory={data}/>
            <ChatForm/>
        </div>
    )
}
