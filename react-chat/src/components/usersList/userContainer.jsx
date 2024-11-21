import "@/assets/styles/users.scss"
import {formatDate} from "../../utils/lib.js";
import AvatarImage from "../common/avatarImage.jsx";

export default function UserContainer({userItem, onClick}) {
    return (
        <li onClick={onClick}
            className="user-container">
            <AvatarImage userItem={userItem}/>
            <div className="user-info">
                <span className="user-name">{userItem.first_name + " " + userItem.last_name}</span>
                <span className="user-last-online">last online at {formatDate(userItem.last_online_at)}</span>
            </div>
        </li>
    )
}
