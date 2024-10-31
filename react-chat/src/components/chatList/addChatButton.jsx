import CreateIcon from '@mui/icons-material/Create';
import "@/assets/styles/buttons.scss"
import {forwardRef} from "react";

const AddChatButton = forwardRef(({}, ref) => {
    return (
        window.innerWidth > 700 ? <>
            <button className="button-add-chat invisibleAddChatButton" ref={ref}>
                <CreateIcon/>
            </button>
        </> : <>
            <button className="button-add-chat visibleAddChatButton" ref={ref}>
                <CreateIcon/>
            </button>
        </>
    )
})

export default AddChatButton
