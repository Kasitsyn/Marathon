import { useState } from "react";
import { TodoListSection } from "../TodoListSection/TodoListSection";
import { taskList, id, addTask, deleteTask } from "../storage"
import "./TodoList.css";
export function TodoList() {
  

  return (
    <div className="todo_list">
      <TodoListSection priority="HIGH" />
      <TodoListSection priority="LOW" />
    </div>
  );
}
