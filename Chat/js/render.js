import { UI } from './view.js';
export const RENDER = {
    showMsg(template) {
        UI.CHAT.append(template.content.cloneNode(true))
        const message = document.querySelector('.messageTxt')
        message.innerHTML = UI.MESSAGE_INPUT.value
        UI.MESSAGE_FORM.reset()
    }
}