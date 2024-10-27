import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import '@/assets/styles/header.scss'
import '@/assets/styles/buttons.scss'
import {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";

export default function ChatListHeader() {
    const {setCurrentUserId, setChatId} = useContext(AppContext)
    return (
        <div className="header header-chat-list">
            <div>
                <button className="button-white">
                    <MenuIcon/>
                </button>
                <button className="button-white" id="button-logout"
                        onClick={() => {
                            setCurrentUserId(null)
                            setChatId(null)
                        }}
                >
                    <LogoutIcon/>
                </button>
            </div>
            <span className="header-app-name">Messenger</span>
            <button className="button-white">
                <SearchIcon/>
            </button>
        </div>
    )
}
