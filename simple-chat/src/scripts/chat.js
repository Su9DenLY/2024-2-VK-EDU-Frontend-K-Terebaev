import {navigateTo, base} from "../index";

export default function renderMessagesPage(wrapper, chatId, recipientName) {
    let messages = [];
    const myUsername = localStorage.getItem('username')
    
    wrapper.appendChild(createHeaderContainer());
    wrapper.appendChild(createSectionContainer());
    wrapper.appendChild(createFormContainer());
    
    document.querySelector('img').src = `${base}/cat.jpg`
    document.querySelector('.header-recipient-info-username').innerText = `${recipientName}`
    
    const form = document.querySelector('form');
    const input = document.querySelector('.form-textarea');
    const sectionMessages = document.querySelector('.section-messages');
    const section = document.querySelector('.section');
    const sendButton = document.querySelector('.button-send')
    const deleteButton = document.getElementById('delete-button')
    const returnButton = document.getElementById('arrow_back');

    form.addEventListener('submit', handleSubmit.bind(this));
    form.addEventListener('keypress', handleKeyPress.bind(this));
    window.addEventListener('beforeunload', saveMessages);
    input.addEventListener('input', autoResize);

    loadMessages();
    renderMessages();

    sendButton.addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
        input.dispatchEvent(new Event('input'));
        input.scrollTop = input.scrollHeight
    });

    deleteButton.addEventListener('click', () => {
        let chats = JSON.parse(localStorage.getItem('chats')) || [];
        let chatIndex = chats.findIndex(chat => chat.id === chatId);
        messages = []
        chats[chatIndex].messages = messages;
        localStorage.setItem('chats', JSON.stringify(chats));
        renderMessages()
    });

    returnButton.addEventListener('click', () => {
        saveMessages()
        navigateTo(`${base}chat`)
    })
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            returnButton.click()
        }
    });
    
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function loadMessages() {
        const chats = JSON.parse(localStorage.getItem('chats'))
        messages = chats.find(chatItem => chatItem.id === chatId).messages || []
    }

    function saveMessages() {
        let chats = JSON.parse(localStorage.getItem('chats')) || [];
        let chatIndex = chats.findIndex(chat => chat.id === chatId);
        chats[chatIndex].messages = messages;
        localStorage.setItem('chats', JSON.stringify(chats));
    }

    function addMessage(username, text, time) {
        messages.push({username, text, time});
        const messageContainer = createMessageContainer(username, text, time)
        sectionMessages.appendChild(messageContainer);
        setTimeout(() => {
            section.scrollTop = section.scrollHeight;
        }, 0)
    }

    function createMessageContainer(username, text, time) {
        const messageContainer = document.createElement('div');
        const messageContent = document.createElement('div');
        const messageUsername = document.createElement('div');
        const messageStatus = document.createElement('div');
        const checkMark = document.createElement('span');

        messageUsername.innerText = `${username}`
        messageContent.innerText = text;
        messageStatus.innerText = `${time}`

        if (username === myUsername) {
            messageContainer.classList.add('message-my-container');
            messageContent.classList.add('message-my-content');
            messageStatus.classList.add('message-status');
            messageUsername.classList.add('message-my-username');
            checkMark.classList.add('material-symbols-outlined');
            checkMark.style.fontSize = '14px';
            checkMark.innerText = `check`
            messageStatus.appendChild(checkMark);
        } else {
            messageContainer.classList.add('message-other-container');
            messageContent.classList.add('message-other-content');
            messageStatus.classList.add('message-status');
            messageUsername.classList.add('message-other-username');
        }

        messageContent.appendChild(messageStatus);
        messageContainer.appendChild(messageUsername);
        messageContainer.appendChild(messageContent);
        return messageContainer;
    }

    function renderMessages() {
        sectionMessages.innerHTML = '';
        
        messages.forEach((messageItem) => {
            const {username, text, time} = messageItem;
            const messageContainer = createMessageContainer(username, text, time);
            sectionMessages.appendChild(messageContainer);
        })
        setTimeout(() => {
            sectionMessages.scrollTop = sectionMessages.scrollHeight;
        }, 0)
        input.dispatchEvent(new Event('input'));
    }

    function handleSubmit(event) {
        event.preventDefault()
        const messageText = input.value.trim()
        if (messageText) {
            let time = new Date()
            addMessage(myUsername, messageText, `${time.getHours()}`.padStart(2, '0') + ':' + `${time.getMinutes()}`.padStart(2, '0'));
            input.value = ''
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.shiftKey) {
                const cursorPos = input.selectionStart;
                input.value = input.value.slice(0, cursorPos) + '\n' + input.value.slice(cursorPos);
                input.selectionStart = input.selectionEnd = cursorPos + 1;
            } else {
                form.dispatchEvent(new Event('submit'));
            }
            input.dispatchEvent(new Event('input'));
            input.scrollTop = input.scrollHeight
        }
    }

    function autoResize() {
        input.style.height = '0px';
        input.style.height = input.scrollHeight + 'px';
    }

    function createHeaderContainer() {
        const header = document.createElement('header');
        header.classList.add('header', 'header-chat');
        header.innerHTML = `
        <button class="button-white" id="arrow_back">
            <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="header-recipient">
            <img class="header-recipient-avatar" alt="avatar"/>
            <div class="header-recipient-info">
                <span class="header-recipient-info-username"></span>
                <span class="header-recipient-info-online">была 2 часа назад</span>
            </div>
        </div>
        <div>
            <button class="button-white">
                <span class="material-symbols-outlined">search</span>
            </button>
            <button class="button-white">
                <span class="material-symbols-outlined" id="delete-button">delete</span>
            </button>
            <button class="button-white">
                <span class="material-symbols-outlined">more_vert</span>
            </button>
        </div>
    `
        
        return header;
    }
    
    function createSectionContainer() {
        const section = document.createElement('section');
        section.classList.add('section');
        section.innerHTML = `<section class="section-messages"></section>`
        return section;
    }

    function createFormContainer() {
        const form = document.createElement('form');
        form.classList.add('form');
        form.innerHTML = `
        <form class="form">
            <button class="button-gray">
                <span class="material-symbols-outlined">attachment</span>
            </button>
            <textarea class="form-textarea" name="message-text" placeholder="Введите сообщение"></textarea>
            <button class="button-send" type="button">
                <span class="material-symbols-outlined">send</span>
            </button>
        </form>`
        return form;
    }
}
