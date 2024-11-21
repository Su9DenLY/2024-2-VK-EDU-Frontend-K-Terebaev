import ProfileEditField from "./profileEditField.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InfoIcon from "@mui/icons-material/Info";
import {useEffect, useState} from "react";
import {FileWorker} from "../../utils/fileWorker.js";
import AvatarImage from "../common/avatarImage.jsx";

export default function ProfileEdit({currentUser, setCurrentUserData}) {
    const [avatar, setAvatar] = useState();

    const handleFieldChange = (field, value) => {
        setCurrentUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };
    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, []);

    const fileWorker = new FileWorker()

    return (
        <div className="profile">
            <AvatarImage userItem={currentUser} otherAvatar={avatar} className={"profile-avatar"}/>
            <input type='file' onChange={(e) => {
                if (e.currentTarget.files.length > 0) {
                    setAvatar(fileWorker.convertToFileUrl(e.currentTarget.files[0]))
                    setCurrentUserData({
                        ...currentUser,
                        avatar: e.currentTarget.files[0]
                    })
                }
            }}/>
            <div className='profile-content'>
                <ProfileEditField logo={<BadgeIcon className="profile-icon"/>} title={"Full Name"}
                                  text={currentUser?.first_name}
                                  className={"profile-field-fullname"}
                                  onChange={(e) => handleFieldChange("first_name", e.target.value)}
                />
                <ProfileEditField logo={<BadgeIcon className="profile-icon"/>} title={"Full Name"}
                                  text={currentUser?.last_name}
                                  className={"profile-field-fullname"}
                                  onChange={(e) => handleFieldChange("last_name", e.target.value)}
                />
                <ProfileEditField logo={<AlternateEmailIcon className="profile-icon"/>}
                                  title={"Username"}
                                  text={currentUser?.username} className={"profile-field-username"}
                                  onChange={(e) => handleFieldChange("username", e.target.value)}
                />
                <ProfileEditField logo={<InfoIcon className="profile-icon"/>}
                                  title={"Bio"}
                                  text={currentUser?.bio} className={"profile-field-bio"}
                                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                                  placeholder={"Укажите информацию о себе (необязательно)"}
                />
            </div>
        </div>
    )
}
