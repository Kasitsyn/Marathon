const list = [
    {
        id: 1,
        name: 'create a post',
        status: 'TODO',
        priority: 'low'
    },
    {
        id: 2,
        name: 'test',
        status: 'Done',
        priority: 'high'
    }
]

const addTask = (name) => {
    list.push({
        id: list.length + 1,
        name: name,
        status: 'TODO',
        priority: 'high'
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
addTask('sleep')
addTask('walk')
addTask('study')
deleteTask('test')
changeStatus('sleep', "In Progress")
changeStatus('study', "Done")
showList()
console.log(list)
