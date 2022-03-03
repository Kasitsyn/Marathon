import { UI } from './view.js';
export const RENDER = {
    showMsg() {
        UI.CHAT.append(UI.MY_MSG_TEMPLATE.content.cloneNode(true))
        const sentMessages = document.querySelectorAll('.messageTxt')
        const lastMessage = sentMessages[sentMessages.length - 1]
        lastMessage.innerHTML = UI.MESSAGE_INPUT.value
        UI.MESSAGE_FORM.reset()
    },
}