const form = document.querySelector('form');
const input = document.querySelector('.form-textarea');
const section = document.querySelector('.section');

form.addEventListener('submit', handleSubmit.bind(this));
form.addEventListener('keypress', handleKeyPress.bind(this));
window.addEventListener('load', renderMessages);
input.addEventListener('input', autoResize);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function renderMessages() {
    section.innerHTML = '';

    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.reverse().forEach((messageItem, index) => {
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
        messageUsername.innerHTML = `
            ${messageItem.username}
        `
        messageContent.innerHTML = `
            <div>${messageItem.text.trim().replace(/\n/g, '<br>')}</div>
        `;
        messageStatus.innerHTML = `
            ${messageItem.time}
        `
        checkMark.innerHTML = `
            check
        `
        messageStatus.appendChild(checkMark);
        messageContent.appendChild(messageStatus);
        messageContainer.appendChild(messageUsername);
        messageContainer.appendChild(messageContent);
        section.appendChild(messageContainer);
        if (index === 0) {
            setTimeout(() => {
                messageContainer.scrollIntoView({behavior: 'smooth'});
            }, 0);
        }

    });
    input.dispatchEvent(new Event('input'));
}

function handleSubmit(event) {
    if (input.value.trim()) {
        event.preventDefault()
        let time = new Date()
        const messageObj = {
            username: "Элизабет",
            text: input.value,
            time: `${time.getHours()}`.padStart(2, '0') + ':' + `${time.getMinutes()}`.padStart(2, '0'),
        }

        let messages = JSON.parse(localStorage.getItem('messages')) || []
        messages.push(messageObj)
        localStorage.setItem(`messages`, JSON.stringify(messages))

        input.value = ''

        renderMessages()
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
    section.style.height = `calc(100vh - 7vh - ${input.style.height})`
}
