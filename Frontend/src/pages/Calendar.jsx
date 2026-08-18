import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../api/tasks";
import HeatmapGrid from "../components/HeatmapGrid";
import TaskItem from "../components/TaskItem";
import { todayString, dayLabel } from "../utils/dates";

function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(todayString());

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
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

  if (loading) return <p>Loading calendar...</p>;

  const dayTasks = tasks.filter((t) => t.scheduled_date === selectedDay);

  return (
    <div>
      <h1>Calendar</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <HeatmapGrid
        tasks={tasks}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      <h2 style={{ marginTop: "20px" }}>{dayLabel(selectedDay)}</h2>
      {dayTasks.length === 0 ? (
        <p>No tasks scheduled for this day.</p>
      ) : (
        dayTasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} />
        ))
      )}
    </div>
  );
}

export default Calendar;