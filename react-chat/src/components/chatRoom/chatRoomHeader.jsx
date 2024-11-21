import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '@/assets/styles/header.scss'
import '@/assets/styles/buttons.scss'
import {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {pathConfig} from "../../configs/path.config.js";
import {formatDate} from "../../utils/lib.js";
import AvatarImage from "../common/avatarImage.jsx";

export default function ChatRoomHeader() {
    const navigate = useNavigate()
    const {recipientData} = useContext(AppContext);

    return (
        <div className="header header-chat">
            <button className="button-white" id="arrow_back" onClick={() => {
                navigate(pathConfig.chatsPath)
            }}>
                <ArrowBackIcon/>
            </button>
            <div className="header-recipient">
                <AvatarImage userItem={recipientData}/>
                <div className="header-recipient-info">
                    <span
                        className="header-recipient-info-username">{recipientData?.first_name + ' ' + recipientData?.last_name}</span>
                    <span
                        className="header-recipient-info-online">был(-а) в сети {formatDate(recipientData?.last_online_at)}</span>
                </div>
            </div>
            <div>
                <button className="button-white">
                    <SearchIcon/>
                </button>
                <button className="button-white">
                    <DeleteOutlineOutlinedIcon/>
                </button>
                <button className="button-white">
                    <MoreVertIcon/>
                </button>
            </div>
        </div>
    )
}
