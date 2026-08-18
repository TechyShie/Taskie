import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../api/tasks";
import TaskItem from "../components/TaskItem";

function getTodayDateString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function Today() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const today = getTodayDateString();
      const data = await getTasks({ date: today });
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(taskId, done) {
    try {
      await updateTask(taskId, { done });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, done } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading today's tasks...</p>;

  return (
    <div>
      <h1>Today</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tasks.length === 0 ? (
        <p>Nothing scheduled for today.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} />
        ))
      )}
    </div>
  );
}

export default Today;