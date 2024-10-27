import {AppContext} from "../AppContext.jsx";
import {useContext, useState} from "react";
import "@/assets/styles/login.scss"

export default function LoginPage() {
    const {users, setUsers, setCurrentUserId} = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            const userId = users.find(userItem => userItem.username === inputValue)?.id;
            if (userId) {
                setCurrentUserId(userId);
            } else {
                const newUserId = parseInt(JSON.parse(localStorage.getItem('users'))?.slice(-1)[0].id) + 1 || 1
                setUsers([...users, {
                    id: newUserId,
                    username: inputValue,
                    chats: []
                }])
                setCurrentUserId(newUserId);
            }
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your username"/>
                <button type="submit" id="login-button">Login</button>
            </form>
        </div>
    )
}
