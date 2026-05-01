import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://52.66.196.136:3000/users");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://52.66.196.136:3000/users", { title });
    setTitle("");
    fetchTasks();
  };

  // temporary frontend-only complete toggle
  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // temporary frontend-only delete
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Task Manager 🚀</h2>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button style={styles.addBtn} onClick={addTask}>
            +
          </button>
        </div>

        {tasks.length === 0 ? (
          <p style={styles.empty}>No tasks yet</p>
        ) : (
          <ul style={styles.list}>
            {tasks.map((t) => (
              <li key={t.id} style={styles.item}>
                <span
                  onClick={() => toggleComplete(t.id)}
                  style={{
                    ...styles.taskText,
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "#888" : "#000",
                  }}
                >
                  {t.title}
                </span>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(t.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial",
  },
  card: {
    width: "420px",
    padding: "25px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  addBtn: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  list: {
    marginTop: "20px",
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    background: "#f7f7f7",
    borderRadius: "8px",
  },
  taskText: {
    cursor: "pointer",
  },
  deleteBtn: {
    border: "none",
    background: "transparent",
    color: "red",
    fontSize: "16px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666",
  },
};

export default App;