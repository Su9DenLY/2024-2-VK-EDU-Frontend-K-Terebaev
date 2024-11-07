import {pathConfig} from "../../configs/path.config.js";
import ProfileEditField from "./profileEditField.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InfoIcon from "@mui/icons-material/Info";

export default function ProfileEdit({currentUser, setCurrentUserData}) {
    const handleFieldChange = (field, value) => {
        setCurrentUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <div className="profile">
            <img className="profile-avatar" alt="avatar" src={`${pathConfig.pathToIcons}/cat.jpg`}/>
            <div className='profile-content'>
                <ProfileEditField logo={<BadgeIcon className="profile-icon"/>} title={"Full Name"}
                                  text={currentUser?.fullname}
                                  className={"profile-field-fullname"}
                                  onChange={(e) => handleFieldChange("fullname", e.target.value)}
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
