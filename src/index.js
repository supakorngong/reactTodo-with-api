import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import Todoitem from "./component/Todoiten";

// TODO :{}
// TODO_LIST : ARRAY

function App() {
  const [todos, setTodos] = useState([
    { userId: 1, id: 1, title: "hw", complete: false },
  ]);
  const [newtodo, setnewtodo] = useState("");
  const [isedit, setIsEdit] = useState(false);

  // useEffect(callback,array) callback จะrun ทุกครั้งที่มีการ render หรือ rerender
  useEffect(() => {
    getAllTodo();
  }, []);
  // API-1 :get all todo
  async function getAllTodo() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      console.log(response.data);
      // Backend state to frontend state
      setTodos(response.data.slice(0, 11));
    } catch (error) {
      console.log(error);
    }
  }
  // API-2 : create todo
  const handleChangetodo = (event) => {
    setnewtodo(event.target.value);
  };

  const createTodo = async () => {
    const data = { title: newtodo, complete: false };
    try {
      let response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos/",
        data
      );
      // console.log(response.status, response.data);
      console.log(response.data);
      setTodos([...todos, response.data]);
      setnewtodo("");
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (updateTodos, todoId) => {
    const updateData = { title: updateTodos, complete: false };
    let response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      updateData
    );
    console.log(response.data);
    // console.log([...todos, response.data]);
    setTodos((prev) => {
      let tempTodo = [...prev];
      let foundindex = tempTodo.findIndex(
        (items) => items.id === response.data.id
      );
      tempTodo[foundindex] = response.data;

      return tempTodo;
    });
  };

  // DELETE TO DO
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${todoId}`
      );
      // ไม่ใช่ status 400 and 500 for sure
      console.log("delete success");
      const newTodolist = [...todos];
      const foundindex = newTodolist.findIndex((todo) => todo.id === todoId);
      if (foundindex !== -1) {
        newTodolist.splice(foundindex, 1);
        setTodos(newTodolist);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handletoggleedit = () => setIsEdit(true);
  const handleSave = () => setIsEdit(false);

  const handleUpdateTodo = (updatetodo, todoId) => {
    // console.log("save");
    updateTodo(updatetodo, todoId);
  };

  return (
    <div className="app">
      <div className="todo">
        <header className="todo__add">
          <h1>
            todolist <button onClick={getAllTodo}>Fetch</button>
          </h1>
          <input value={newtodo} onChange={handleChangetodo} />
          <button onClick={createTodo}>add</button>
        </header>

        <ul className="todo__list">
          {todos.map((todo) => (
            <Todoitem
              todo={todo}
              deleteTodo={deleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
