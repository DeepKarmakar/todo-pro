import React, { useEffect, useState } from "react";
import "./todo.scss";
import db from "../../firebase";
import {
  Check2,
  Check2Square,
  PencilSquare,
  Square,
  Trash,
  X,
} from "react-bootstrap-icons";
import * as http from "../../http";
import { toast } from "react-toastify";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const addTodoHandeler = (event) => {
    event.preventDefault();
    if (todoName) {
      const addTodoReq = {
        isDone: false,
        name: todoName,
      };
      http.addDoc("todos", addTodoReq).then(
        (res) => {
          addTodoReq.id = res.id;
          todos.unshift(addTodoReq);
          setTodos([...todos]);
          toast.success(res.message);
        },
        (error) => {
          console.log(error);
          toast.error(error.message);
        }
      );
      setTodoName("");
    }
  };

  const deleteHandeler = (todoItem, index) => {
    let isDeleteConfirm = window.confirm("Want to delete?");
    if (isDeleteConfirm) {
      http.deleteDoc("todos", todoItem.id).then(
        (res) => {
          todos.splice(index, 1);
          setTodos([...todos]);
          toast.success(res.message);
        },
        (error) => {
          toast.error(error.message);
          console.log(error);
        }
      );
    }
  };

  const editHandeler = (todoItem) => {
    todos.map((item) => {
      if (item.hasOwnProperty("isEditing")) {
        delete item.isEditing;
      }
    });
    todoItem.isEditing = true;
    setTodos([...todos]);
    setEditTodo(todoItem.name);
  };

  const updateHandeler = (todoItem, event = null) => {
    debugger;
    if (event) {
      event.preventDefault();
    }
    delete todoItem.isEditing;
    const updateObj = {
      name: editTodo,
      isDone: false,
    };

    http
      .updateDoc("todos", todoItem.id, updateObj)
      .then((res) => {
        todoItem.name = editTodo;
        toast.success(res.message);
        setTodos([...todos]);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const closeUpdate = (todoItem) => {
    delete todoItem.isEditing;
    setTodos([...todos]);
  };

  const updateEditInp = (val) => {
    setEditTodo(val);
  };

  useEffect(() => {
    http.getAllDocs("todos").then(
      (data) => {
        setTodos(data);
      },
      (error) => {
        toast.error("Something went wrong!");
        console.log(error);
      }
    );
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
        {todos.map((todo, index) => (
          <li key={todo.id} className={todo.isEditing ? "editing" : ""}>
            <label>
              <input type="checkbox" />
              <Square className="unCheck" size={15}></Square>
              <Check2Square className="checked" size={18}></Check2Square>
              <span className="ml-5">
                {todo.isEditing ? (
                  <form onSubmit={(event) => updateHandeler(todo, event)}>
                    <input
                      type="text"
                      id="editInp"
                      autoFocus
                      value={editTodo}
                      onChange={(event) => updateEditInp(event.target.value)}
                    />
                  </form>
                ) : (
                  <>{todo.name}</>
                )}
              </span>
            </label>
            <div className="item-action">
              {todo.isEditing ? (
                <>
                  <Check2
                    onClick={() => updateHandeler(todo)}
                    size={18}
                  ></Check2>
                  <X size={18} onClick={() => closeUpdate(todo)}></X>
                </>
              ) : (
                <>
                  <PencilSquare
                    onClick={() => editHandeler(todo)}
                  ></PencilSquare>
                  <Trash onClick={() => deleteHandeler(todo, index)}></Trash>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
