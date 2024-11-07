import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {Sections} from "../../pages/mainPage.jsx";
import {pathConfig} from "../../configs/path.config.js";
import {useContext} from "react";
import {AppContext} from "../../AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {DropDownItem, DropDownWrapper} from "../common/dropDown/dropDown.jsx";


export default function Menu({setSection}) {
    const {setCurrentUserId} = useContext(AppContext)
    const navigate = useNavigate();

    return (
        <DropDownWrapper>
            <DropDownItem logo={<PersonIcon/>} text={'Профиль'} onClick={() => {
                setSection(Sections.profile);
            }}/>
            <DropDownItem logo={<LogoutIcon/>} text={'Выйти'} onClick={() => {
                setCurrentUserId(null)
                navigate(pathConfig.basePath)
            }}/>
        </DropDownWrapper>
    )
}
