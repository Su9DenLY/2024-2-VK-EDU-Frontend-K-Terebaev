import {useEffect, useRef} from "react";

export default function ProfileEditField({logo, title, text, onChange, placeholder}) {
    const textAreaRef = useRef(null);

    const handleResize = () => {
        const textarea = textAreaRef.current;
        textarea.style.height = "0";
        textarea.style.height = `${10 + textarea.scrollHeight}px`;
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
                          onInput={handleResize}
                />
            </div>
        </div>
    )
}
