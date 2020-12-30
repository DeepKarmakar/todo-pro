import { useState } from "react";
import "./App.scss";
import Notes from "./components/notes/Notes";
import Todo from "./components/todo/Todo";

function App() {
  const [isTodo, setIsTodo] = useState(true);
  const setTodo = (val) => {
    setIsTodo(val);
  };
  return (
    <div className="App">
      <header className="App-header">
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

export default App;
