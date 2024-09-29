let messages = [];

const form = document.querySelector('form');
const input = document.querySelector('.form-textarea');
const section = document.querySelector('.section');
const deleteButton = document.getElementById('delete-button')

form.addEventListener('submit', handleSubmit.bind(this));
form.addEventListener('keypress', handleKeyPress.bind(this));
window.addEventListener('beforeunload', saveMessages);
input.addEventListener('input', autoResize);

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
    section.prepend(messageContainer);
    setTimeout(() => {
        messageContainer.scrollIntoView({behavior: 'smooth'});
    }, 0)
}

function createMessageContainer(username, text, time) {
    const messageContainer = document.createElement('div');
    const messageContent = document.createElement('div');
    const messageUsername = document.createElement('div');
    const messageStatus = document.createElement('div');
    const checkMark = document.createElement('span');

    messageContainer.classList.add('message-container');
    messageContent.classList.add('message-content');
    messageStatus.classList.add('message-status');
    messageUsername.classList.add('message-username');
    checkMark.classList.add('material-symbols-outlined');
    checkMark.style.fontSize = '14px';

    messageUsername.innerHTML = `${username}`
    messageContent.innerHTML = `<div>${text.replace(/\n/g, '<br>')}</div>`;
    messageStatus.innerText = `${time}`

    checkMark.innerText = `check`

    messageStatus.appendChild(checkMark);
    messageContent.appendChild(messageStatus);
    messageContainer.appendChild(messageUsername);
    messageContainer.appendChild(messageContent);
    return messageContainer;
}

function renderMessages() {
    section.innerHTML = '';
    for (let i = messages.length - 1; i >= 0; i--) {
        const {username, text, time} = messages[i];
        const messageContainer = createMessageContainer(username, text, time);
        section.appendChild(messageContainer);
    }
    setTimeout(() => {
        section.scrollTop = section.scrollHeight;
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
