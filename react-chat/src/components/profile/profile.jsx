import {AppContext} from "../../AppContext.jsx";
import {useContext, useEffect, useState} from "react";
import "@/assets/styles/profile.scss"
import ProfileEdit from "./profileEdit.jsx";
import ProfileView from "./profileView.jsx";
import ProfileHeader from "./profileHeader.jsx";

export default function Profile({setSection}) {
    const {currentUserId, users, setUsers} = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserData, setCurrentUserData] = useState(users.find((user) => user.id === currentUserId));

    useEffect(() => {
        setCurrentUserData(users.find((user) => user.id === currentUserId))
    }, [isEditing])

    const saveUserData = (updatedData) => {
        const fullnameNotEmpty = Object.hasOwn(updatedData, "fullname") ? updatedData.fullname.trim() : true
        const usernameNotEmpty = Object.hasOwn(updatedData, "username") ? updatedData.username.trim() : true
        if (fullnameNotEmpty && usernameNotEmpty) {
            const updatedUsers = users.map(user =>
                user.id === currentUserId ? {...user, ...updatedData} : user
            );
            setUsers(updatedUsers);
            return true
        }
        return false
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
