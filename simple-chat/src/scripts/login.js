import {navigateTo, base} from "../index";


export default function renderLoginPage(wrapper) {
    let username
    const users = JSON.parse(localStorage.getItem('users')) || []
    wrapper.classList.add('login-wrapper');
    wrapper.innerHTML = `
        <div class="login-form">
            <input type="text" id="login-input" placeholder="Enter your username">
            <button id="login-button">Login</button>
        </div>
    `;

    document.getElementById('login-button').addEventListener('click', () => {
        username = document.getElementById('login-input').value.trim();
        if (username) {
            if (!users.some(user => user.username === username)) {
                let userId = JSON.parse(localStorage.getItem('users'))?.slice(-1)[0].id + 1 || 1
                users.push({'id': userId, 'username': username, 'chats': []});
                localStorage.setItem('users', JSON.stringify(users));
            }
            localStorage.setItem('username', username);
            wrapper.classList.remove('login-wrapper');
            navigateTo(`${base}chat`);
        }
    });
}