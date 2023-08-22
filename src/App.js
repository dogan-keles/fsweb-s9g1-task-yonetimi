import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (m) => toast.success(`${m} Başarıyla Eklendi!`);
const notifyInfo = (m) => toast.info(`${m} Başarıyla Eklendi!`);

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);
  const { register, handleSubmit } = useForm();
  function handleTaskSubmit(yeniTask) {
    notifySuccess(yeniTask.title);
    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    notifySuccess(yeniKisi);
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    console.log("Tamamlandı", id);
    const yeniTasks = tasks.map((t) => {
      if (t.id === id) {
        notifyInfo(t.title);
        return { ...t, status: "yapıldı" };
      } else {
        return t;
      }
    });
    setTasks(yeniTasks);
  }

  return (
    <div className="app">
      <ToastContainer />
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
