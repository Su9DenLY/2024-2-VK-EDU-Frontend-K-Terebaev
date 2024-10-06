import renderMessagesPage from './scripts/chat'
import renderChatListPage from './scripts/chatlist'
import renderLoginPage from './scripts/login'

export const base = '/2024-2-VK-EDU-Frontend-K-Terebaev/'

const wrapper = document.querySelector('.wrapper');
let username = localStorage.getItem('username')
let users = JSON.parse(localStorage.getItem('users')) || []
const chats = JSON.parse(localStorage.getItem('chats')) || []

if (users.length === 0 && chats.length === 0) {
    users.push({'id': 1, 'username': 'Элизабет', 'chats': [1, 3]})
    users.push({'id': 2, 'username': 'Дженнифер', 'chats': [1, 2, 4]})
    users.push({'id': 3, 'username': 'Иннокентий', 'chats': [4]})
    users.push({'id': 4, 'username': 'Евлампий', 'chats': [2, 3]})
    chats.push({'id': 1, 'users': [1, 2], 'messages': []})
    chats.push({'id': 2, 'users': [2, 4], 'messages': []})
    chats.push({'id': 3, 'users': [1, 4], 'messages': []})
    chats.push({'id': 4, 'users': [2, 3], 'messages': []})
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('chats', JSON.stringify(chats))
}

export function navigateTo(url) {
    history.pushState({}, '', url);
    renderPage(url);
}

function renderPage(url) {
    wrapper.innerHTML = '';
    username = localStorage.getItem('username');
    users = JSON.parse(localStorage.getItem('users')) || []
    if (!username && (url !== `${base}`)) {
        navigateTo(`${base}`);
        return;
    }
    if (url === `${base}` || !username) {
        renderLoginPage(wrapper);
    } else if (url === `${base}chat`) {
        const userId = users.find(userItem => userItem.username === username).id || 0
        renderChatListPage(wrapper, userId);
    } else if (url.startsWith(`${base}chat`)) {
        const userId = users.find(userItem => userItem.username === username).id || 0
        const chatId = parseInt(url.split('/chat/')[1]);
        const chatItem = chats.find(chatItem => chatItem.id === chatId);
        const recipientId = chatItem.users.find(id => id !== userId)
        const recipientName = users.find(userItem => userItem.id === recipientId).username;
        renderMessagesPage(wrapper, chatId, recipientName);
    } else {
        navigateTo(`${base}`);
    }
}

window.addEventListener('load', () => {
    username = localStorage.getItem('username')
    if (username) {
        renderPage(window.location.pathname);
    } else {
        navigateTo(`${base}`)
    }
});

window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
});