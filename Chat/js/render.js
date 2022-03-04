import { UI } from './view.js';
export const RENDER = {
    showMsg(message) {
        UI.CHAT.append(UI.MY_MSG_TEMPLATE.content.cloneNode(true))
        const sentMessages = document.querySelectorAll('.message')
        const lastMessage = sentMessages[sentMessages.length - 1]
        const time = new Date(Date.parse(message.createdAt)).toLocaleString("ru", {hour: 'numeric', minute: 'numeric'})
        lastMessage.firstElementChild.innerHTML = message.text
        lastMessage.lastElementChild.innerHTML = time
        UI.MESSAGE_FORM.reset()
    },
}