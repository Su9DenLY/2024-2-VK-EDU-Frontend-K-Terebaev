let messages = [];
const myUsername = 'Элизабет'

const form = document.querySelector('form');
const input = document.querySelector('.form-textarea');
const sectionMessages = document.querySelector('.section-messages');
const section = document.querySelector('.section');
const deleteButton = document.getElementById('delete-button')

form.addEventListener('submit', handleSubmit.bind(this));
form.addEventListener('keypress', handleKeyPress.bind(this));
window.addEventListener('beforeunload', saveMessages);
input.addEventListener('input', autoResize);

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

deleteButton.addEventListener('click', () => {
    messages = []
    localStorage.clear()
    renderMessages()
});

loadMessages();
renderMessages();

function loadMessages() {
    messages = JSON.parse(localStorage.getItem('messages')) || []
}

function saveMessages() {
    localStorage.setItem('messages', JSON.stringify(messages));
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
    sectionMessages.appendChild(createMessageContainer('Дженнифер', 'Привет!', '11:24'));
    sectionMessages.appendChild(createMessageContainer(myUsername, 'Привет', '11:24'));
    sectionMessages.appendChild(createMessageContainer('Дженнифер', 'Как дела?', '11:24'));
    sectionMessages.appendChild(createMessageContainer('Дженнифер', 'Что делаешь?', '11:25'));
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
        const username = 'Элизабет'
        addMessage(username, messageText, `${time.getHours()}`.padStart(2, '0') + ':' + `${time.getMinutes()}`.padStart(2, '0'));
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
