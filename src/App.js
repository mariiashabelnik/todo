import "./App.css";
import InputBox from "./components/InputBox";
import { useState, useEffect } from "react";
import Task from "./components/Task";
import Paper from "@mui/material/Paper";
import "./index.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // ladda mina todos
      const resp = await fetch("http://localhost:5050/todos");
      const json = await resp.json();
      setTodos(json);
    };

    fetchData();
  }, []);

  function createTodo() {
    if (inputText !== "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        task: inputText,
        completed: false,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5050/todos", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setTodos(result);
          setInputText("");
        })
        .catch((error) => console.log("error", error));

      //todos.push({ task: inputText, completed: false });
    }
  }

  function toggleTask(id, completed) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      completed: !completed,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:5050/todos/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTodos(result);
      })
      .catch((error) => console.log("error", error));
  }

  function removeTask(id) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:5050/todos/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTodos(result);
      })
      .catch((error) => console.log("error", error));
  }

  const list = todos.map((item, index) => {
    return (
      <Task
        key={item.task}
        title={item.task}
        id={item.id}
        toggleTask={toggleTask}
        removeTask={removeTask}
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
