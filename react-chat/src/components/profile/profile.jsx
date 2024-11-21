import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import "@/assets/styles/profile.scss"
import ProfileEdit from "./profileEdit.jsx";
import ProfileView from "./profileView.jsx";
import ProfileHeader from "./profileHeader.jsx";
import {UserWorker} from "../../api/user.js";
import {Sections} from "../../pages/mainPage.jsx";

export default function Profile({setSection}) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserData, setCurrentUserData] = useState({});

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsEditing(false);
                setSection(Sections.chats)
            }
        }

        document.addEventListener('keydown', (event) => handleEscape(event));

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, [isEditing]);


    const loadUser = async () => {
        try {
            const newUserdata = await UserWorker.getUser("current")
            setCurrentUserData(newUserdata.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadUser()
    }, [isEditing])

    const saveUserData = async (updatedData) => {
        const firstNameNotEmpty = Object.hasOwn(updatedData, "first_name") ? updatedData.first_name.trim() : true
        const lastNameNotEmpty = Object.hasOwn(updatedData, "last_name") ? updatedData.last_name.trim() : true
        const usernameNotEmpty = Object.hasOwn(updatedData, "username") ? updatedData.username.trim() : true

        try {
            if (firstNameNotEmpty && lastNameNotEmpty && usernameNotEmpty) {
                const accessToken = localStorage.getItem("accessToken")
                const userId = jwtDecode(accessToken).user_id
                const newUserdata = await UserWorker.patchUser(userId, updatedData)
                setCurrentUserData(newUserdata);
                return true
            }
            return false
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="wrapper-sidebar">
            <ProfileHeader setSection={setSection} isEditing={isEditing} setIsEditing={setIsEditing}
                           saveUserData={() => saveUserData(currentUserData)}/>
            {isEditing ? <ProfileEdit currentUser={currentUserData} setCurrentUserData={setCurrentUserData}/> :
                <ProfileView currentUser={currentUserData}/>}
        </div>
    )
}
