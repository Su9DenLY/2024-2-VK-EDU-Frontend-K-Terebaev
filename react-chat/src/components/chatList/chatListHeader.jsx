import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '@/assets/styles/header.scss'
import '@/assets/styles/buttons.scss'
import {useEffect, useRef, useState} from "react";
import Menu from "./menu.jsx";

export default function ChatListHeader({setSection}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const clickOutsideMenu = (event) => {
        if (!menuRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideMenu)

        return () => document.removeEventListener('mousedown', clickOutsideMenu)
    }, [isOpen]);

    return (
        <div className="header header-sidebar">
            <div ref={menuRef}>
                <button className="button-white"
                        onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon/>
                </button>
                {
                    isOpen && <Menu setSection={setSection}/>
                }
            </div>
            <span className="header-title">Messenger</span>
            <button className="button-white">
                <SearchIcon/>
            </button>
        </div>
    )
}
