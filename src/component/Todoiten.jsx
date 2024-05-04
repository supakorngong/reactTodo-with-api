import { useState } from "react";

function Todoitem(props) {
  const { todo, deleteTodo, handleUpdateTodo } = props;
  const [isedit, setIsEdit] = useState(false);

  const [updatetodo, setupdatetodo] = useState("");

  const handletoggleedit = () => setIsEdit(!isedit);
  const handleSave = () => setIsEdit(!isedit);

  const handleChange = (event) => {
    setupdatetodo(event.target.value);
  };

  return (
    <li className="todo__item">
      {!isedit ? (
        <p>{todo.title}</p>
      ) : (
        <input value={updatetodo || todo.title} onChange={handleChange} />
      )}
      {/* {!isedit && (
        <input className={todo.complete ? "done" : ""}>{todo.title}</input>
      )} */}
      {!isedit ? (
        <button onClick={handletoggleedit}>edit</button>
      ) : (
        <button
          onClick={(event) => {
            handleUpdateTodo(updatetodo, todo.id);
            handletoggleedit();
          }}
        >
          save
        </button>
      )}

      {/* <button onClick={handletoggleedit}>{!isedit ? "edit" : "save"}</button> */}
      <button onClick={() => deleteTodo(todo.id)}>x</button>
    </li>
  );
}
export default Todoitem;
