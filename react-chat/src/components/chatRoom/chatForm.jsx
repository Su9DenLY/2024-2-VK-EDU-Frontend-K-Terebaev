import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import '@/assets/styles/buttons.scss'
import '@/assets/styles/form.scss'
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {ChatWorker} from "../../api/chat.js";

export default function ChatForm() {
    const [messageText, setMessageText] = useState('')
    const textareaRef = useRef(null)
    const {id: chatId} = useParams();

    const handleResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `0`
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight < 50 ? 50 : textareaRef.current.scrollHeight}px`
        }
    };

    const handleChange = (event) => {
        setMessageText(event.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event)
        }
    };

    useEffect(() => {
        handleResize();
    }, [messageText])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedText = messageText.trim();
        if (trimmedText) {
            const formData = new FormData();
            formData.append("text", messageText);
            formData.append("files", '');
            formData.append("voice", '');
            formData.append("chat", chatId);
            try {
                const res = await ChatWorker.sendMessage(formData)
                setMessageText('')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <button className="button-gray">
                <AttachmentIcon/>
            </button>
            <textarea
                ref={textareaRef}
                autoFocus={true}
                value={messageText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className=" form-textarea"
                placeholder=" Введите сообщение..."
                rows={1}
            />
            <button type=" submit" className=" button-send">
                <SendIcon/>
            </button>
        </form>
    )
}
