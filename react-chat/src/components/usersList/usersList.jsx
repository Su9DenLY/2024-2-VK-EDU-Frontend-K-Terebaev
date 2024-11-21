import SideBarHeader from "../common/sideBarHeader.jsx";
import {useEffect, useRef, useState} from "react";
import {UserWorker} from "../../api/user.js";
import UsersListMain from "./usersListMain.jsx";
import {Sections} from "../../pages/mainPage.jsx";

export default function UsersList({setSection}) {
    const [users, setUsers] = useState([]);
    const [myData, setMyData] = useState({});
    const [scrollPosition] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchText, setCurrentSearchText] = useState("");
    const [nextPage, setNextPage] = useState(true);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setSection(Sections.chats)
            }
        }

        document.addEventListener('keydown', (event) => handleEscape(event));

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const newUserdata = await UserWorker.getUser("current")
                setMyData(newUserdata);
            } catch (error) {
                console.error(error)
            }
        }
        loadUser()
    }, [])

    const loadUsers = async (page = 1, search = "") => {
        if (page !== 1 && (loading || !nextPage)) return;

        if (page === 1) setUsers([]);

        setLoading(true);
        try {
            const data = await UserWorker.getUsers(page, search);
            setUsers(prevData => {
                const newUsers = data.results.filter(
                    newUser => !prevData.some(user => user.id === newUser.id)
                );
                return [...prevData, ...newUsers];
            });
            setCurrentPage(page);
            setNextPage(Boolean(data.next));

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                loadUsers(currentPage + 1, currentSearchText);
            }
        };

        const ref = scrollRef.current;
        ref.addEventListener("scroll", handleScroll);

        return () => ref.removeEventListener("scroll", handleScroll);
    }, [scrollPosition, currentPage, nextPage, loading]);


    return (
        <div className="wrapper-sidebar">
            <SideBarHeader setSection={setSection}
                           searchText={currentSearchText}
                           setCurrentSearchText={setCurrentSearchText}
                           callback={() => loadUsers(1, currentSearchText)}/>
            <UsersListMain users={users}
                           myData={myData}
                           loading={loading}
                           setSection={setSection}
                           ref={scrollRef}/>
        </div>
    )
}
