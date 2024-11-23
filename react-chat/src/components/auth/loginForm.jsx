import "@/assets/styles/login.scss"
import "@/assets/styles/input.scss"
import {AuthWorker} from "../../api/auth.js";
import {pathConfig} from "../../configs/path.config.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Toast} from "../../utils/toast.js";

export default function LoginForm({}) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    const navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userData.username && userData.password) {
            AuthWorker.login(userData, () => navigate(pathConfig.concatPath('/chats')))
        } else {
            Toast.info("Заполнены не все поля")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Log in</h2>
            <div className="input-wrapper">
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                    placeholder=""/>
                <label>Username</label>
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    placeholder=""/>
                <label>Password</label>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
