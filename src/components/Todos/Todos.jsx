import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Todos.module.scss";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import Todo from "./Todo/Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ text: "", completed: false });
  const [filterOn, setFilterOn] = useState("all");
  const [updatingData, setUpdatingData] = useState(null);
  const inputRef = useRef(null);

  const updateStatus = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = {
      ...updatedTodos[todoIndex],
      completed: !updatedTodos[todoIndex].completed,
    };

    setTodos(updatedTodos);
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (updatingData) {
      const todoIndex = todos.findIndex((todo) => todo.id === updatingData.id);
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        ...todo,
      };
      setTodos(updatedTodos);
      setUpdatingData(null);
    } else {
      setTodos((oldState) => {
        return [
          ...oldState,
          {
            id: Math.random(1000),
            createdAt: new Date().toLocaleDateString(),
            ...todo,
          },
        ];
      });
    }

    setTodo({ text: "", completed: false });
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const addDataBeforeClosing = useCallback(
    (event) => {
      event.preventDefault();
      const stringifiedTodos = JSON.stringify(todos);
      localStorage.setItem("todos", stringifiedTodos);
    },
    [todos]
  );

  useEffect(() => {
    window.onbeforeunload = addDataBeforeClosing;
  }, [addDataBeforeClosing]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos([...savedTodos]);
    }
  }, []);

  const setTodoForm = (id) => {
    inputRef.current.focus();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const todo = todos[todoIndex];
    setUpdatingData({ id });
    setTodo({ text: todo.text, completed: todo.completed });
  };

  return (
    <div className={classes.Main}>
      <div className={classes.Header}>
        <h2 className={classes.HeaderText}>To-dos</h2>
        <select
          className={classes.Dropdown}
          onChange={(event) => {
            setFilterOn(event.target.value);
          }}
        >
          <option defaultChecked value="all">
            All
          </option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <form onSubmit={addTodo} className={classes.TodoInputForm}>
        <CustomCheckbox
          checked={todo.completed}
          changed={() => {
            setTodo({ ...todo, completed: !todo.completed });
          }}
        />
        <input
          ref={inputRef}
          value={todo.text}
          onChange={(event) => {
            setTodo({ ...todo, text: event.target.value });
          }}
          type="text"
          placeholder="What do you want to do?"
          className={classes.TodoInput}
        />
      </form>
      <div className={classes.TodosContainer}>
        {todos
          .filter((todo) => {
            switch (filterOn) {
              case "all":
                return true;
              case "active":
                return !todo.completed;
              case "completed":
                return todo.completed;
              default:
                return true;
            }
          })
          .map((todo) => {
            return (
              <Todo
                key={todo.text}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                createdAt={todo.createdAt}
                updateStatus={updateStatus}
                setTodoForm={setTodoForm}
                removeTodo={removeTodo}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
