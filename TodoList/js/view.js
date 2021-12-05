import { list, id, addTask, deleteTask, changeStatus, showList } from './main.js'

const inputAll = document.querySelectorAll('.todo_list__input')
const addBtnAll = document.querySelectorAll('.todo_list__add_button')
const sectionsAll = document.querySelectorAll('.todo_list__section')

const renderTask = (index) => {
    const newTaskDiv = document.createElement('div')
    const newChekbox = document.createElement('input')
    const newSpan = document.createElement('span')
    const deleteBtn = document.createElement('button')
    const imgDeleteBtn = document.createElement("IMG");

    newChekbox.type = 'checkbox'
    imgDeleteBtn.src = './img/add-icon.svg'
    newTaskDiv.classList.add('todo_list__task')
    newChekbox.classList.add('todo_list__checkbox')
    newSpan.classList.add('todo_list__input')
    deleteBtn.classList.add('todo_list__delete_button')
    imgDeleteBtn.classList.add('todo_list__delete_button_icon')

    newTaskDiv.append(newChekbox)
    newTaskDiv.append(newSpan)
    newTaskDiv.append(deleteBtn)
    deleteBtn.append(imgDeleteBtn)
    newSpan.textContent = inputAll[index].value
    sectionsAll[index].append(newTaskDiv)

    addEventListenerOnDeleteBtn()
    addEventListenerOnCheckboxBtn()
    inputAll[index].value = ''

}

const addEventListenerOnDeleteBtn = () => {
    const deleteBtnAll = document.querySelectorAll('.todo_list__delete_button')
    deleteBtnAll.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            elem.closest('div').remove()
        })
    })
}

const addEventListenerOnCheckboxBtn = () => {
    const checkboxBtnAll = document.querySelectorAll('.todo_list__checkbox')
    checkboxBtnAll.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            elem.closest('div').classList.toggle('done')

        })

    })

}

addBtnAll.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
        if (index === 0) {
            addTask(inputAll[index].value, 'high')
            renderTask(index)
        }
        if (index === 1) {
            addTask(inputAll[index].value, 'low')
            renderTask(index)
        }

    })


})

inputAll.forEach((elem, index) => {
    elem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (index === 0) {
                addTask(inputAll[index].value, 'high')
                renderTask(index)
            }
            if (index === 1) {
                addTask(inputAll[index].value, 'low')
                renderTask(index)
            }
        }

    })
})







