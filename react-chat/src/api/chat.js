import {AggregatorApi} from "./aggregator.js";
import axios from "axios";

class ChatApi extends AggregatorApi {
    constructor() {
        super();
        this.chatsPageSize = 100
        this.chatUrl = `${this.url}/api/chat/`
        this.chatsUrl = `${this.url}/api/chats/`
    }

    getChats(page = 1, search = '') {
        const token = localStorage.getItem("accessToken");

        return axios.get(this.chatsUrl, {
            params: {
                page,
                page_size: this.chatsPageSize,
                search: search
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getChatById(id) {
        const token = localStorage.getItem("accessToken");
        return axios.get(`${this.chatUrl}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }

    createChat(userData, myData) {
        const token = localStorage.getItem("accessToken");
        const chatData = {
            members: [userData.id],
            is_private: true,
            title: `Чат с ${userData.username}`,
            created_by: myData,
        };
        return axios.post(this.chatsUrl, chatData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
    }

    getMessages(id, page = 1, pageSize = 20) {
        const token = localStorage.getItem("accessToken");

        return axios.get(`${this.url}/api/messages/?chat=${id}&page=${page}&page_size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    sendMessage(message) {
        const token = localStorage.getItem("accessToken");
        return axios.post(`${this.url}/api/messages/`, message, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    async markMessageAsRead(id) {
        const token = localStorage.getItem("accessToken");
        try {
            const res = await axios.post(`${this.url}/api/message/${id}/read/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const ChatWorker = new ChatApi()
