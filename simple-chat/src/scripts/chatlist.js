import {navigateTo, base} from "../index";

export default function renderChatListPage(wrapper, userId) {
    let users = JSON.parse(localStorage.getItem('users')) || []
    const chatIds = users.find(userItem => userItem.id === userId).chats
    const chats = JSON.parse(localStorage.getItem('chats')) || []


    wrapper.appendChild(createHeaderContainer())
    wrapper.appendChild(createSectionContainer())
    wrapper.appendChild(createButtonAddChat())

    const sectionChats = document.querySelector('.section-chats');
    const addChatButton = document.getElementById('.button-add-chat')
    const logoutButton = document.getElementById('button-logout')

    // TODO
    // addChatButton.addEventListener('click', () => {
    //
    // })

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username')
        location.replace(`${base}`)
    })

    chats.forEach(chatItem => {
        if (chatIds.includes(chatItem.id)) {
            sectionChats.appendChild(createChatContainer(chatItem.id))
        }
    })

    function createHeaderContainer() {
        const header = document.createElement('header')
        header.classList.add('header', 'header-chat-list')
        header.innerHTML = `
        <div>
            <button class="button-white">
                <span class="material-symbols-outlined">menu</span>
            </button>
            <button class="button-white" id="button-logout">
                <span class="material-symbols-outlined">logout</span>
            </button>
        </div>
        <span class="header-app-name">Messenger</span>
        <button class="button-white">
                <span class="material-symbols-outlined">search</span>
        </button>
        `
        return header
    }

    function createSectionContainer() {
        const section = document.createElement('section');
        section.classList.add('section');
        section.innerHTML = `<div class="section-chats"></div>`
        return section;
    }

    function createChatContainer(chatId) {
        const chatItem = chats.find(chatItem => chatItem.id === chatId);
        const recipientId = chatItem.users.find(id => id !== userId)
        const recipientName = users.find(userItem => userItem.id === recipientId).username
        const lastMessage = chatItem.messages.slice(-1)[0]

        const chatContainer = document.createElement('div');
        const chatAvatar = document.createElement('div');
        const chatInfo = document.createElement('div');
        const chatInfoRow = document.createElement('div');
        const chatName = document.createElement('span');
        const lastMessageText = document.createElement('span');
        const lastMessageMeta = document.createElement('div');
        const lastMessageTime = document.createElement('span');
        const lastMessageCheck = document.createElement('span');
        const avatarImage = document.createElement('img')

        chatContainer.classList.add('chat-container');
        chatName.classList.add('chat-name');
        lastMessageMeta.classList.add('chat-last-message-meta');
        lastMessageTime.classList.add('chat-last-message-time');
        lastMessageCheck.classList.add('chat-last-message-check', 'material-symbols-outlined');
        chatInfo.classList.add('chat-info');
        chatInfoRow.classList.add('chat-info-row');
        lastMessageText.classList.add('chat-last-message');
        avatarImage.classList.add('chat-avatar');

        chatContainer.id = chatId;
        avatarImage.src = `${base}/cat.jpg`;
        chatName.innerText = `${recipientName}`
        lastMessageText.innerText = `${lastMessage?.text || ''}`
        lastMessageTime.innerText = `${lastMessage?.time || ''}`
        if (lastMessage && lastMessage.username !== recipientName) {
            lastMessageCheck.innerText = `check`
        }

        chatAvatar.appendChild(avatarImage)
        lastMessageMeta.appendChild(lastMessageCheck)
        lastMessageMeta.appendChild(lastMessageTime)
        chatInfoRow.appendChild(chatName)
        chatInfoRow.appendChild(lastMessageMeta)
        chatInfo.appendChild(chatInfoRow)
        chatInfo.appendChild(lastMessageText)
        chatContainer.appendChild(chatAvatar)
        chatContainer.appendChild(chatInfo)

        chatContainer.addEventListener('click', () => {
            navigateTo(`${base}chat/${chatId}`);
        })

        return chatContainer
    }

    function createButtonAddChat() {
        const button = document.createElement('button');
        button.classList.add('button-add-chat');
        button.innerHTML = `<span class="material-symbols-outlined">draw</span>`
        return button;
    }
}