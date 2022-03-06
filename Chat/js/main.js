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
    console.log(STORAGE.myEmail);
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
    console.log(messagesHistory);
    
    const messageHistoryLast15 = STORAGE.messagesHistory.slice( (STORAGE.messagesHistory.length - 15), STORAGE.messagesHistory.length )
    console.log(messageHistoryLast15);

    STORAGE.saveMsgData(messagesHistory[0])
    console.log(STORAGE.messageData)

    messageHistoryLast15.forEach(messageData => {
        RENDER.showMsg(messageData)
    });
}












