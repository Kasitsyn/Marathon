import "./Task.css";
import addIcon from "../../img/add-icon.svg"

export function Task(params) {
  return (
    <div class="todo_list__task">
      <input type="checkbox" class="todo_list__checkbox" />
      <span class="todo_list__input"></span>
      <button class="todo_list__delete_button">
        <img src={addIcon} class="todo_list__delete_button_icon" alt="удалить задачу"/>
      </button>
    </div>
  );
}
