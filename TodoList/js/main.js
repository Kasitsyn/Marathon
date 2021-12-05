let id = 0
const list = [
    {
        id: id++,
        name: 'create a post',
        status: 'TODO',
        priority: 'low'
    },
    {
        id: id++,
        name: 'test',
        status: 'Done',
        priority: 'high'
    }
]

const addTask = (name, priority) => {
    list.push({
        id: id++,
        name: name,
        status: 'TODO',
        priority: priority
    })
}

const deleteTask = (name) => {
    let indexOfTask
    list.forEach((task, index) => task.name === name ? indexOfTask = index : "" )
    list.splice(indexOfTask, 1)
}


const changeStatus = (name, status) => {
   list.forEach((task) => task.name === name ? task.status = status : "")
   
}

const showList = () => {
    let toDoArr = []
    let doneArr = []
    let inProgressArr = []
    for (task of list) {
        if (task.status === "TODO") toDoArr.push(task.name)
        else if (task.status === "Done") doneArr.push(task.name)
        else if (task.status === "In Progress") inProgressArr.push(task.name)
    }
    console.log(
        `Todo: \n${toDoArr} \n\nIn Progress: \n${inProgressArr} \n\nDone: \n${doneArr}`        
    )
}


export { list, id, addTask, deleteTask, changeStatus, showList };

