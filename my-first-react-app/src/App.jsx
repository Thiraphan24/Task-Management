import Headerd from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id) {
    const result = tasks.filter((item) => item.id !== id);
    setTasks(result);
  }

  function editTask(id) {
    //1
    setEditId(id);
    const editTask = tasks.find((item) => item.id === id);
    setTitle(editTask.title);
  }

  function saveTasks(e) {
    e.preventDefault();
    if (title === null) {
      alert("กรุณาป้อนข้อมูล");
    } else if (editId) {
      const updateTask = tasks.map((item) => {
        if (item.id === editId) {
          return { ...item, title: title };
        }
        return item;
      });
      setTasks(updateTask);
      setEditId(null);
      setTitle("");
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title,
      };
      setTasks([...tasks, newTask]), setTitle("");
    }
  }
  return (
    <div className={"App " + theme}>
      <Headerd theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm
          title={title}
          editId={editId}
          setTitle={setTitle}
          saveTasks={saveTasks}
        />
        <section>
          {tasks.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
