import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { Task } from "../Task/Task";
import "./TodoListSection.css";
import { taskList, id, addTask, deleteTask } from "../storage";
import { useState } from "react";
export function TodoListSection(props) {
  const [tasks, setTaskList] = useState(taskList);
  let taskName;
  const handleChange = (e) => {
    taskName = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskName, props.priority);
  };

  return (
    <section className="todo_list__section">
      <h2 className="todo_list__title">{props.priority}</h2>
      <AddTaskForm handleChange={handleChange} handleSubmit={handleSubmit} />
      <Task />
    </section>
  );
}
