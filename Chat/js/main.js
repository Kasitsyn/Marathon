import { UI } from './view.js';
import { RENDER } from './render.js';
import { API } from './api.js'
import { STORAGE } from './storage.js';
import { getCookie, setCookie, deleteCookie } from './cookies.js';

// API.webSocketConnect()

UI.SEND_BTN.addEventListener('click', (e) => {
    e.preventDefault()
    RENDER.showMsg(STORAGE.messageData)
})

UI.GET_CODE_BTN.addEventListener('click', (e) => {
    e.preventDefault()
    STORAGE.saveToStorage('email', UI.EMAIL_INPUT.value)
    console.log(STORAGE.email);
    API.getCode()
})

UI.CONFIRM_BTN.addEventListener('click', (e) => {
    e.preventDefault()
    API.saveToken()

})

UI.CHANGE_NAME_BTN.addEventListener('click', async (e) => {
    e.preventDefault()
    STORAGE.saveToStorage('name', UI.NAME_INPUT.value)
    API.changeName()
})

document.ondblclick = async (e) => {
    e.preventDefault()
    const messagesHistory = await API.getMsgHistory()

    STORAGE.saveMsgHistory(messagesHistory)
    console.log(messagesHistory[0]);
    STORAGE.saveMsgData(messagesHistory[0])
    console.log(STORAGE.messageData)

    STORAGE.messagesHistory.forEach(messageData => {
        RENDER.showMsg(messageData)
    });
}












