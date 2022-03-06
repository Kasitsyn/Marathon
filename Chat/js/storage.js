import { UI } from './view.js';

export const STORAGE = {
    myEmail: { email: '' },
    name: { name: '' },

    messagesHistory: [],

    messageData: {
        createdAt: '',
        text:'',
        email: '',    
        name: ''
    },

    saveMsgData(message) {
        this.messageData.createdAt = message.createdAt
        this.messageData.text = message.text
        this.messageData.email = message.user.email
        this.messageData.name = message.user.name
    },

    saveMsgHistory(messagesHistory) {
        this.messagesHistory = messagesHistory
    },
    saveToStorage(name, data) {
        this[name][name] = data
    }
}