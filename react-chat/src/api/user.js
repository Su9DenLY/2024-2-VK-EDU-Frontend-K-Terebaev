import {AggregatorApi} from "./aggregator.js";
import axios from "axios";

class UserApi extends AggregatorApi {
    constructor() {
        super();
        this.userUrl = `${this.url}/api/user/`
        this.usersUrl = `${this.url}/api/users/`
    }

    getUser(userId) {
        const token = localStorage.getItem("accessToken");
        return axios.get(`${this.userUrl}${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

    }

    async patchUser(userId, updateData) {
        const token = localStorage.getItem("accessToken");
        const data = new FormData();
        for (const key in updateData) {
            if (key === 'avatar') {
                if (typeof updateData['avatar'] !== 'string') {
                    data.append(key, updateData[key]);
                }
            } else {
                data.append(key, updateData[key]);
            }
        }

        try {
            const res = await axios.patch(
                `${this.userUrl}${userId}/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    async getUsers(page = 1, search = '') {
        const token = localStorage.getItem("accessToken");

        try {
            const res = await axios.get(this.usersUrl, {
                params: {
                    page,
                    page_size: this.pageSize,
                    search
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }


}

export const UserWorker = new UserApi()
