import {pathConfig} from "../../configs/path.config.js";
import ProfileField from "./profileField.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InfoIcon from "@mui/icons-material/Info";

export default function ProfileView({currentUser}) {
    return (
        <div className="profile">
            <img className="profile-avatar" alt="avatar" src={`${pathConfig.pathToIcons}/cat.jpg`}/>
            <div className='profile-content'>
                <ProfileField logo={<BadgeIcon className="profile-icon"/>} title={"Full Name"}
                              text={currentUser?.fullname}
                              className={"profile-field-fullname"}/>
                <ProfileField logo={<AlternateEmailIcon className="profile-icon"/>} title={"Username"}
                              text={currentUser?.username} className={"profile-field-username"}/>
                {currentUser?.bio ? <ProfileField logo={<InfoIcon className="profile-icon"/>} title={"Bio"}
                                                  text={currentUser?.bio} className={"profile-field-bio"}/> : null}
            </div>
        </div>
    )
}
