import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import {Sections} from "../../pages/mainPage.jsx";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileHeader({setSection, isEditing, setIsEditing, saveUserData}) {
    const sectionName = isEditing ? 'Редактирование' : 'Профиль'
    const saveData = () => {
        if (saveUserData()) {
            setIsEditing(false)
        }
    }

    const arrowBackHandle = () => isEditing ? setIsEditing(false) : setSection(Sections.chats)
    const switchHandle = () => isEditing ? saveData() : setIsEditing(true)

    return (
        <div className='header'>
            <button className="button-white" onClick={() => arrowBackHandle()}>
                <ArrowBackIcon/>
            </button>
            <span className="header-title">{sectionName}</span>
            <button className="button-white" onClick={() => switchHandle()}>
                {isEditing ? <CheckIcon/> : <EditIcon/>}
            </button>
        </div>
    )
}
