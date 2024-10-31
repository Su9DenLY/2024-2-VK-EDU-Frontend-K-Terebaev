import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '@/assets/styles/header.scss'
import '@/assets/styles/buttons.scss'
import {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";

export default function ChatRoomHeader({recipientData}) {
    const {chats, chatId, setChats, setChatId, base} = useContext(AppContext)

    const handleDelete = () => {
        const newChats = chats?.map(chat => {
            if (chat?.id === chatId) {
                return {
                    ...chat,
                    messages: [],
                }
            }
            return chat
        })
        setChats(newChats)
    }

    return (
        <div className="header header-chat">
            <button className="button-white" id="arrow_back" onClick={() => {
                setChatId(0)
            }}>
                <ArrowBackIcon/>
            </button>
            <div className="header-recipient">
                <img className="header-recipient-avatar" alt="avatar" src={`${base}/cat.jpg`}/>
                <div className="header-recipient-info">
                    <span className="header-recipient-info-username">{recipientData?.username}</span>
                    <span className="header-recipient-info-online">была 2 часа назад</span>
                </div>
            </div>
            <div>
                <button className="button-white">
                    <SearchIcon/>
                </button>
                <button className="button-white" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon/>
                </button>
                <button className="button-white">
                    <MoreVertIcon/>
                </button>
            </div>
        </div>
    )
}
