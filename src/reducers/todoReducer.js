import { v4 as uuidv4 } from "uuid";
import { DELETE_TODO, ADD_TODO, SAVE_TODO, UPDATE_TODO } from "../actions/type";

const initState = {
  save: null,
  todos: [
    { title: "sleep", isDone: false, id: uuidv4() },
    { title: "Watch TV", isDone: false, id: uuidv4() },
    { title: "play", isDone: false, id: uuidv4() },
  ],
};
const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.payload),
      };
    case ADD_TODO:
      return { ...state, todos: [action.payload, ...state.todos] };
    case SAVE_TODO:
      return { ...state, save: action.payload };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((el) =>
          el.id === state.save.id ? { ...el, title: action.payload } : el
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
