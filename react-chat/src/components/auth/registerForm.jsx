import {useState} from "react";
import {AuthWorker} from "../../api/auth.js";
import {Toast} from "../../utils/toast.js";

export default function RegisterForm({setIsLogin}) {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        bio: "",
        avatar: null
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userData.username && userData.password && userData.password) {
            AuthWorker.register(userData, () => setIsLogin(true))
        } else {
            Toast.info("Заполнены не все поля")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Sign up</h2>
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
            <div className="input-wrapper">
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                    placeholder=""/>
                <label>First Name</label>
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                    placeholder=""/>
                <label>Last Name</label>
            </div>
            <button type="submit">Sign up</button>
        </form>
    )
}
