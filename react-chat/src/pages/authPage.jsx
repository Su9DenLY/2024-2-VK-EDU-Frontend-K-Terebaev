import {useState} from "react";
import "@/assets/styles/login.scss"
import LoginForm from "../components/auth/loginForm.jsx";
import RegisterForm from "../components/auth/registerForm.jsx";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="auth-wrapper">
            <div className="auth-selector">
                <button className="auth-selector-button" onClick={() => setIsLogin(true)}>Log in</button>
                <button className="auth-selector-button" onClick={() => setIsLogin(false)}>Sign up</button>
            </div>
            <div className={`auth-container ${isLogin ? "" : "flipped"}`}>
                <div className="auth-side">
                    <LoginForm/>
                </div>
                <div className="auth-side">
                    <RegisterForm setIsLogin={setIsLogin}/>
                </div>
            </div>
        </div>
    )
}
