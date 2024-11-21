import jwtDecode from "jwt-decode";
import {useEffect} from "react";
import {AuthWorker} from "./api/auth.js";
import {pathConfig} from "./configs/path.config.js";
import {useNavigate} from "react-router-dom";


export default function TokenProvider() {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
            const expireAccessToken = jwtDecode(accessToken)?.exp
            const expiration = expireAccessToken * 1000 - Date.now()
            const result = Math.floor(expiration / 1000 / 60)
            if (result > 0) {
                const timeToRefresh = setTimeout(async () => {
                    AuthWorker.refresh(refreshToken, () => navigate(pathConfig.concatPath('/')))
                }, result * 60 * 1000)
                return () => {
                    clearTimeout(timeToRefresh)
                }
            } else {
                AuthWorker.refresh(refreshToken, () => navigate(pathConfig.concatPath('/')))
            }
            
        } else {
            navigate(pathConfig.concatPath('/'))
        }
    }, []);

    return <></>
}