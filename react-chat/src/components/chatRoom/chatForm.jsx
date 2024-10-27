import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import '@/assets/styles/buttons.scss'
import '@/assets/styles/form.scss'
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../AppContext.jsx";

export default function ChatForm() {
    const {setChats, chats, chatId, currentUserId} = useContext(AppContext)
    const [messageText, setMessageText] = useState('')
    const textareaRef = useRef(null)

    const handleResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '0'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedText = messageText.trim();
        if (trimmedText) {
            const newChats = chats?.map(chat => {
                if (chat?.id === chatId) {
                    const time = (new Date())
                    const modifyTime = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0')
                    return {
                        ...chat,
                        messages: [...chat?.messages, {
                            senderId: currentUserId,
                            text: trimmedText,
                            time: modifyTime
                        }],
                    }
                }
                return chat
            })
            setChats(newChats)
            setMessageText('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <button className="button-gray">
                <AttachmentIcon/>
            </button>
            <textarea
                ref={textareaRef}
                value={messageText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="form-textarea"
                placeholder="Введите сообщение..."
                rows={1}
            />
            <button type="submit" className="button-send">
                <SendIcon/>
            </button>
        </form>
    )
}
