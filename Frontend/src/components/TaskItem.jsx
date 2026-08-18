function TaskItem({ task, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px" }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id, !task.done)}
      />

      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.text}
      </span>

      {task.rolled_from && (
        <span style={{ fontSize: "11px", color: "grey" }}>
          (rolled from {task.rolled_from})
        </span>
      )}
    </div>
  );
}

export default TaskItem;