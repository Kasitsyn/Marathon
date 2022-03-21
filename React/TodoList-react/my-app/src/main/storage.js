

let id = 0;
const taskList = [
    {
        id: id++,
        name: "LOW TASK TEST",
        status: "TODO",
        priority: "low",
    },
    {
        id: id++,
        name: "HIGH TASK TEST",
        status: "Done",
        priority: "high",
    },
];

const addTask = (name, priority) => {
    taskList.push({
        id: id++,
        name: name,
        status: "TODO",
        priority: priority,
    });
};

const deleteTask = (name) => {
    let indexOfTask;
    taskList.forEach((task, index) =>
        task.name === name ? (indexOfTask = index) : ""
    );
    taskList.splice(indexOfTask, 1);
};

export { taskList, id, addTask, deleteTask };