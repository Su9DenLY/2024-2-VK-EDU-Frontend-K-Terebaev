import {AggregatorApi} from "./aggregator.js";
import axios from "axios";
import {errorHandler} from "../utils/lib.js";
import {Toast} from "../utils/toast.js";

class AuthApi extends AggregatorApi {
    constructor() {
        super();
        this.authUrl = `${this.url}/api/auth/`
        this.registerUrl = `${this.url}/api/register/`
        this.refreshUrl = `${this.url}/api/auth/refresh/`
    }

    async login(data, callback) {
        try {
            const res = await axios.post(this.authUrl, data)
            if (res.status === 200) {
                callback && callback()
                localStorage.setItem('accessToken', res.data.access)
                localStorage.setItem('refreshToken', res.data.refresh)
            }
        } catch (error) {
            console.error(error)
            errorHandler(error)
        }
    }

    async register(data, callback) {
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);

            const res = await axios.post(this.registerUrl, formData)

            if (res.status === 201) {
                callback && callback()
                Toast.success("Вы успешно зарегистрировались!")
            }

        } catch (error) {
            console.error(error)
            errorHandler(error)
        }
    }

    logout(callback) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        callback && callback()
    }

    async refresh(refreshToken, callback) {
        try {
            const res = await axios.post(this.refreshUrl, {refresh: refreshToken})
            if (res.status === 200) {
                localStorage.setItem('accessToken', res.data.access)
                localStorage.setItem('refreshToken', res.data.refresh)
            }
        } catch (error) {
            console.error(error)
            this.logout(callback)
        }
    }
}

export const AuthWorker = new AuthApi()
