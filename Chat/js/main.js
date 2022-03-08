import { UI } from './view.js';
import { RENDER } from './render.js';
import { API } from './api.js'
import { STORAGE } from './storage.js';
import { getCookie, setCookie, deleteCookie } from './cookies.js';

const socket = new WebSocket(`ws://chat1-341409.oa.r.appspot.com/websockets?${API.TOKEN}`)

window.onload = async (e) => {
    const messagesHistory = await API.getMsgHistory()

    STORAGE.saveMsgHistory(messagesHistory)

    const messageHistoryLast100 = STORAGE.messagesHistory.slice((STORAGE.messagesHistory.length - 100), STORAGE.messagesHistory.length)
    messageHistoryLast100.forEach(messageData => {
        RENDER.showMsg(messageData)
    });
}


socket.onmessage = async function (event) {
    RENDER.showMsg(JSON.parse(event.data))
}

UI.SEND_BTN.addEventListener('click', (e) => {
    e.preventDefault()
    socket.send(JSON.stringify({
        text: UI.MESSAGE_INPUT.value,
    }))

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














