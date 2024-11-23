import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '@/assets/styles/header.scss'
import '@/assets/styles/buttons.scss'
import {useEffect, useRef, useState} from "react";
import Menu from "../chatList/menu.jsx";
import {Sections} from "../../pages/mainPage.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from '@mui/icons-material/Clear';

export default function SideBarHeader({section, setSection, searchText, setCurrentSearchText, callback}) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const menuRef = useRef(null);

    const clickOutsideMenu = (event) => {
        if (!menuRef.current.contains(event.target)) {
            setMenuIsOpen(false)
        }
    }

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                if (searchIsOpen) {
                    setSearchIsOpen(false)
                }
            }
        }

        document.addEventListener('keydown', (event) => handleEscape(event));

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, [searchIsOpen]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setCurrentSearchText && setCurrentSearchText(searchText);
            callback && callback();
        }, 300);

        return () => clearTimeout(handler); // Очистка предыдущего таймера
    }, [searchText]);

    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideMenu)

        return () => document.removeEventListener('mousedown', clickOutsideMenu)
    }, [menuIsOpen]);

    const handleSearchTextChange = (event) => {
        setCurrentSearchText(event.target.value);
    }

    const handleSearchButtonClick = () => {
        setSearchIsOpen(!searchIsOpen)
        setCurrentSearchText("")
    }

    return (
        <div className="header header-sidebar">
            <div ref={menuRef}>
                {section === Sections.chats ? <>
                    <button className="button-white"
                            onClick={() => setMenuIsOpen(!menuIsOpen)}
                    >
                        <MenuIcon/>
                    </button>
                    {menuIsOpen && <Menu setSection={setSection}/>}
                </> : <>
                    <button className="button-white" onClick={() => setSection(Sections.chats)}>
                        <ArrowBackIcon/>
                    </button>
                </>}
            </div>
            {searchIsOpen ? <input className="header-sidebar-search"
                                   placeholder="Search"
                                   autoFocus
                                   onChange={handleSearchTextChange}
            >
            </input> : <span className="header-title">Messenger</span>}
            <button className="button-white" onClick={() => handleSearchButtonClick()}>
                {searchIsOpen ? <ClearIcon/> : <SearchIcon/>}
            </button>
        </div>
    )
}
