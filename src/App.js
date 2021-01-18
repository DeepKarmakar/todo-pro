import { useState } from "react";
import "./App.scss";
import Notes from "./components/notes/Notes";
import Todo from "./components/todo/Todo";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        transition={Slide}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
