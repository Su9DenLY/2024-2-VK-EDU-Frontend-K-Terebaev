import ProfileField from "./profileField.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InfoIcon from "@mui/icons-material/Info";
import AvatarImage from "../common/avatarImage.jsx";

export default function ProfileView({currentUser}) {

    return (
        <div className="profile">
            <AvatarImage userItem={currentUser} className={"profile-avatar"}/>
            <div className='profile-content'>
                <ProfileField logo={<BadgeIcon className="profile-icon"/>} title={"First Name"}
                              text={currentUser?.first_name}
                              className={"profile-field-fullname"}/>
                <ProfileField logo={<BadgeIcon className="profile-icon"/>} title={"Last Name"}
                              text={currentUser?.last_name}
                              className={"profile-field-fullname"}/>
                <ProfileField logo={<AlternateEmailIcon className="profile-icon"/>} title={"Username"}
                              text={currentUser?.username} className={"profile-field-username"}/>
                {currentUser?.bio ? <ProfileField logo={<InfoIcon className="profile-icon"/>} title={"Bio"}
                                                  text={currentUser?.bio} className={"profile-field-bio"}/> : null}
            </div>
        </div>
    )
}
