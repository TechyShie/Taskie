import { formatDate, parseDate, todayString } from "../utils/dates";

function getDayStatus(tasksForDay) {
  if (tasksForDay.length === 0) return { level: 0, empty: true };
  const done = tasksForDay.filter((t) => t.done).length;
  const pct = done / tasksForDay.length;
  let level = 0;
  if (pct === 1) level = 3;
  else if (pct >= 0.5) level = 2;
  else if (pct > 0) level = 1;
  return { level, empty: false, pct };
}

function buildGridDates(allTasks) {
  const dates = [...new Set(allTasks.map((t) => t.scheduled_date))].sort();
  if (dates.length === 0) return [];

  const first = parseDate(dates[0]);
  first.setDate(first.getDate() - first.getDay());
  const last = parseDate(dates[dates.length - 1]);
  last.setDate(last.getDate() + (6 - last.getDay()));

  const allDays = [];
  const cursor = new Date(first);
  while (cursor <= last) {
    allDays.push(formatDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return allDays;
}

function HeatmapGrid({ tasks, selectedDay, onSelectDay }) {
  const gridDates = buildGridDates(tasks);
  const today = todayString();

  const tasksByDate = {};
  tasks.forEach((t) => {
    if (!tasksByDate[t.scheduled_date]) tasksByDate[t.scheduled_date] = [];
    tasksByDate[t.scheduled_date].push(t);
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", maxWidth: "600px" }}>
      {gridDates.map((date) => {
        const dayTasks = tasksByDate[date] || [];
        const status = getDayStatus(dayTasks);
        const isFuture = date > today;
        const isSelected = date === selectedDay;

        const colors = ["#eee", "#c8e6d0", "#7bc99a", "#2e8b57"];
        const bg = status.empty ? "#eee" : colors[status.level];

        return (
          <div
            key={date}
            onClick={() => !isFuture && onSelectDay(date)}
            title={date}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              background: bg,
              opacity: isFuture ? 0.35 : 1,
              cursor: isFuture ? "default" : "pointer",
              outline: isSelected ? "2px solid #333" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default HeatmapGrid;