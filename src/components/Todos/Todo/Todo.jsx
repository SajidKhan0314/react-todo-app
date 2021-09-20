import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
import classes from "./Todo.module.scss";

const Todo = (props) => {
  return (
    <div className={classes.Todo}>
      <div className={classes.TodoDetails}>
        <CustomCheckbox
          checked={props.completed}
          changed={() => props.updateStatus(props.id)}
        />

        <div className={classes.TodoDetailsTextBox}>
          <span
            onClick={() => {
              props.setTodoForm(props.id);
            }}
          >
            {props.text}
          </span>
          <button
            className={classes.RemoveButton}
            onClick={() => props.removeTodo(props.id)}
          >
            &#10005;
          </button>
        </div>
      </div>
      <div className={classes.TodoCreatedAt}>Created At: {props.createdAt}</div>
    </div>
  );
};

export default Todo;
