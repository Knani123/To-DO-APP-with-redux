import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  todoDelete,
  todoAdd,
  saveTodo,
  updateTodo,
} from "./actions/todoActions";
const App = () => {
  const [input, setInput] = useState({
    title: "",
    isDone: false,
    id: "",
  });
  const todos = useSelector((state) => state.todoReducer.todos);
  const save = useSelector((state) => state.todoReducer.save);
  const dispatch = useDispatch();
  console.log(todos);

  useEffect(() => {
    save && setInput({ ...input, title: save.title });
  }, [save]);

  return (
    <div className="text.center m-1">
      <h1 className="m-auto w-50 text-center">ToDo App</h1>
      <div className="container jumbotron alert-info  border border-secondary text-center p-3 ">
        <div className="d-flex  justify-content-center align-items-center p-4">
          <input
            type="text"
            name=""
            id=""
            value={input.title}
            onChange={(e) =>
              setInput({ ...input, title: e.target.value, id: uuidv4() })
            }
          />
          <button
            className="btn btn-success p-1 m-1"
            onClick={() => {
              if (save) {
                dispatch(updateTodo(input.title));
                setInput({
                  title: "",
                  isDone: false,
                  id: "",
                });
                dispatch(saveTodo(null));
              } else {
                dispatch(todoAdd(input));
                setInput({
                  title: "",
                  isDone: false,
                  id: "",
                });
              }
            }}
          >
            {save ? "update" : "Add"}
          </button>
        </div>

        {todos.map((el) => (
          <div className="d-flex justify-content-between w-50 m-auto">
            <h4>{el.title}</h4>
            <div>
              <button
                className="btn btn-info m-1"
                onClick={() => dispatch(saveTodo(el))}
              >
                edit
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={() => {
                  dispatch(todoDelete(el.id));
                  dispatch(saveTodo(null));
                  setInput({
                    title: "",
                    isDone: false,
                    id: "",
                  });
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
