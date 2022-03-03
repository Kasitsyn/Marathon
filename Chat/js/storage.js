import { UI } from './view.js';

export const STORAGE = {
    email: { email: '' },
    name: { name: '' },

    messagesHistory: [],

    saveMsgToStorage(messagesHistory) {
        this.messagesHistory = messagesHistory 
    },
    saveToStorage(name, data) {
        this[name][name] = data
    }
}