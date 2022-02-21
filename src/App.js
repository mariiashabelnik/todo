import "./App.css";
import InputBox from "./components/InputBox";
import { useState } from "react";
import Task from "./components/Task";
import Paper from "@mui/material/Paper";
import "./index.css";

function App() {
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState([]);

  function createTodo() {
    if (inputText !== "") {
      todos.push({ task: inputText, completed: false });
      setTodos(todos);
      setInputText("");
    }
  }

  function toggleTask(clickIndex) {
    const newTodo = todos.map((item, index) => {
      if (clickIndex === index) {
        item.completed = !item.completed;
      }
      return item;
    });

    setTodos(newTodo);
  }

  function removeTask(clickIndex) {
    const newTodo = todos.filter((item, index) => {
      if (clickIndex === index) {
        return false;
      } else {
        return true;
      }
    });

    setTodos(newTodo);
  }

  const list = todos.map((item, index) => {
    return (
      <Task
        key={item.task}
        title={item.task}
        toggleTask={toggleTask}
        removeTask={removeTask}
        index={index}
        completed={item.completed}
      />
    );
  });

  return (
    <div className="App">
      <p>To Do list</p>
      <Paper elevation={3} className="content">
        <InputBox
          inputText={inputText}
          setInputText={setInputText}
          createTodo={createTodo}
          btnValue="Add"
        />
        <br />
        <div className="tasks">{list}</div>
      </Paper>
    </div>
  );
}

export default App;
