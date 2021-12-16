import {UI} from './view.js'

UI.TABS.forEach( (elem) => {
    elem.addEventListener('click', (e) => {
       UI.TABS.forEach((el) => {
           el.classList.remove('btn__activated')
       }) 
       e.currentTarget.classList.add('btn__activated')
    })
})

console.log()