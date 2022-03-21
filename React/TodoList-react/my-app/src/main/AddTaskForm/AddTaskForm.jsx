import "./AddTaskForm.css";
import addIcon from "../../img/add-icon.svg";

export function AddTaskForm(props) {
  
    
  
    return (
    <form className="todo_list__add_task">
      <input
        className="todo_list__input"
        type="text"
        
        onChange={props.handleChange}
        placeholder="Add any task"
      />
      <button className="todo_list__add_button" onClick={props.handleSubmit}>
        <img
          className="todo_list__add_button_icon"
          src={addIcon}
          alt="закрыть"
        />
      </button>
    </form>
  );
}
