import { UI } from './view.js';
import { RENDER } from './render.js';

UI.SEND_BTN.addEventListener('click', (e) => {
    e.preventDefault()
    RENDER.showMsg(UI.MY_MSG_TEMPLATE)
})