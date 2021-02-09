import React, { useState } from "react";
import Notes from "../notes/Notes";
import Todo from "../todo/Todo";
import { useAuth } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import dummyUserImage from "../../assets/images/avatar.png";

export default function Dashboard() {
  const [isTodo, setIsTodo] = useState(true);
  const { currentUser, logOut } = useAuth();
  const history = useHistory();
  const setTodo = (val) => {
    setIsTodo(val);
  };
  async function signOut() {
    try {
      await logOut();
      history.push("/login");
    } catch {
      alert("error");
    }
  }

  return (
    <div>
      <header className="App-header">
        <div className="userInfo">
          <img
            src={currentUser?.photoURL || dummyUserImage}
            alt={currentUser?.displayName}
            title={currentUser?.displayName}
          />
          <div>
            <strong>{currentUser.displayName || currentUser.email}</strong>
            <div className="logout-text" onClick={signOut}>
              Logout
            </div>
          </div>
        </div>
        <ul className="menu">
          <li className={isTodo ? "active" : ""} onClick={() => setTodo(true)}>
            ToDo
          </li>
          <li
            className={!isTodo ? "active" : ""}
            onClick={() => setTodo(false)}
          >
            Notes
          </li>
        </ul>
      </header>
      <main>
        <div className="container">
          {isTodo ? <Todo></Todo> : <Notes></Notes>}
        </div>
      </main>
    </div>
  );
}
