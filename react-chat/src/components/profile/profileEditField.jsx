import {useEffect, useRef} from "react";

export default function ProfileEditField({logo, title, text, onChange, placeholder}) {
    const textAreaRef = useRef(null);

    const handleResize = () => {
        const textarea = textAreaRef.current;
        textarea.style.height = "0";
        textarea.style.height = `${10 + textarea.scrollHeight}px`;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    };

    useEffect(() => {
        handleResize();
    }, [text]);

    return (
        <div className="profile-field">
            {logo}
            <div>
                <span className="profile-field-title">{title}</span>
                <textarea ref={textAreaRef}
                          className="profile-field-input"
                          value={text}
                          placeholder={placeholder}
                          onChange={onChange}
                          onKeyDown={handleKeyDown}
                          onInput={handleResize}
                          rows={1}
                />
            </div>
        </div>
    )
}
