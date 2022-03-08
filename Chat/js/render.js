import { UI } from './view.js';
import { STORAGE } from './storage.js';
export const RENDER = {
    showMsg(messageData) {
        console.log(STORAGE.myEmail.email)
        console.log(messageData);
        console.log(messageData.user.email)
        UI.CHAT.append(UI.MSG_TEMPLATE.content.cloneNode(true))

        const sentMessages = document.querySelectorAll('.message')
        const message = sentMessages[sentMessages.length - 1]

        let messageUserName = message.children[0]
        let messageText = message.children[1]
        let messageTime = message.children[2]

        if (messageData.user.email === STORAGE.myEmail.email) {
            message.classList.add('myMessage')
        }

        
        const messageTimeFormated = new Date(Date.parse(messageData.createdAt)).toLocaleString("ru", { hour: 'numeric', minute: 'numeric' })

        messageUserName.innerHTML = messageData.user.name
        messageText.innerHTML = messageData.text
        messageTime.innerHTML = messageTimeFormated

        UI.CHAT.scrollTop = UI.CHAT.scrollHeight

        UI.MESSAGE_FORM.reset()
    },
}