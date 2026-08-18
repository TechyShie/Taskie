import { useState } from "react";

function QuickAddForm({ onAdd }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      await onAdd(text.trim());
      setText("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
      <input
        type="text"
        placeholder="Add a quick task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: "6px" }}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default QuickAddForm;