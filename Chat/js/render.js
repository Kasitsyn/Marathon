import { UI } from './view.js';
import { STORAGE } from './storage.js';
export const RENDER = {
    showMsg(message) {
        console.log(STORAGE.myEmail.email)
        
        UI.CHAT.append(UI.MSG_TEMPLATE.content.cloneNode(true))

        const sentMessages = document.querySelectorAll('.message')
        const lastMessage = sentMessages[sentMessages.length - 1]

        if (true) {
            lastMessage.classList.add('myMessage')
        }

        let lastMessageText = lastMessage.firstElementChild
        let lastMessageTime = lastMessage.lastElementChild
        const messageTimeFormated = new Date(Date.parse(message.createdAt)).toLocaleString("ru", { hour: 'numeric', minute: 'numeric' })

        lastMessageText.innerHTML = message.text
        lastMessageTime.innerHTML = messageTimeFormated

        UI.CHAT.scrollTop = UI.CHAT.scrollHeight

        UI.MESSAGE_FORM.reset()
    },
}