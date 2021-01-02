import React, { useEffect, useState } from "react";
import "./todo.scss";
import db from "../../firebase";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  const addTodoHandeler = (event) => {
    event.preventDefault();
    if (todoName) {
      db.collection("todos").add({
        isDone: false,
        name: todoName,
      });
      setTodoName("");
    }
  };

  const deleteHandeler = (docId) => {
    let isDeleteConfirm = window.confirm("Want to delete?");
    if (isDeleteConfirm) {
      const docRef = db.collection("todos").doc(docId);

      docRef
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.log("not deleted");
        });
    }
  };

  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      console.log(snapshot.docs);
      const todoArr = [];
      snapshot.docs.map((doc) => {
        let constTodoObj = {};
        constTodoObj = { ...doc.data() };
        constTodoObj.id = doc.id;
        todoArr.push(constTodoObj);
      });
      setTodos(todoArr);
    });
  }, []);

  return (
    <div className="addTodoContainer">
      <div className="addTodo">
        <form onSubmit={addTodoHandeler}>
          <input
            type="text"
            placeholder="Add Todo"
            value={todoName}
            onChange={(event) => setTodoName(event.target.value)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </form>
      </div>
      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.name}</span>
            </label>
            <div className="item-action">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </span>
              <span onClick={() => deleteHandeler(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
