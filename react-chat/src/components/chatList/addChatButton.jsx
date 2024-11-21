import CreateIcon from '@mui/icons-material/Create';
import "@/assets/styles/buttons.scss"
import {forwardRef} from "react";
import {Sections} from "../../pages/mainPage.jsx";

const AddChatButton = forwardRef(({setSection}, ref) => {
    return (
        window.innerWidth > 700 ? <>
            <button className="button-add-chat invisibleAddChatButton" onClick={() => setSection(Sections.users)}
                    ref={ref}>
                <CreateIcon/>
            </button>
        </> : <>
            <button className="button-add-chat visibleAddChatButton" onClick={() => setSection(Sections.users)}
                    ref={ref}>
                <CreateIcon/>
            </button>
        </>
    )
})

export default AddChatButton
