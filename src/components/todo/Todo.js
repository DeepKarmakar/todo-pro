import React, { useEffect, useState } from "react";
import "./todo.scss";
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
import { useAuth } from "../../context/authContext";
import firebase from "firebase";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const { currentUser } = useAuth();

  const addTodoHandeler = (event) => {
    event.preventDefault();
    if (todoName) {
      const addTodoReq = {
        isDone: false,
        name: todoName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      http.addDoc("todos", addTodoReq, currentUser.uid).then(
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
      http.deleteDoc("todos", todoItem.id, currentUser.uid).then(
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

  const updateHandeler = (todoItem, event = null, isDoneUpdate = false) => {
    let updateObj;
    if (isDoneUpdate) {
      updateObj = {
        name: todoItem.name,
        isDone: event.target.checked,
      };
    } else {
      if (event) {
        event.preventDefault();
      }
      delete todoItem.isEditing;
      updateObj = {
        name: editTodo,
        isDone: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
    }

    http
      .updateDoc("todos", todoItem.id, updateObj, currentUser.uid)
      .then((res) => {
        if (!isDoneUpdate) {
          todoItem.name = editTodo;
        }
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
    http.getAllDocs("todos", currentUser.uid).then(
      (data) => {
        setTodos(data);
        console.log(data);
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
              <input
                type="checkbox"
                onChange={(event) => {
                  todo.isDone = event.target.checked;
                  updateHandeler(todo, event, true);
                }}
                checked={todo.isDone}
              />
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
