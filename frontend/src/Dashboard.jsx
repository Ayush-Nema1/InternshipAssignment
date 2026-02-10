import { TextField, Button, Container, Card } from "@mui/material";
import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${userId}`)
      .then((res) => res.json())
      .then(setTodos);
  }, [userId]);

  const addTodo = async () => {
    if (!title) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((t) => t._id !== id));
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container className="dashboard-wrapper">
      <Card className="dashboard-card">
        <h2 className="dashboard-title">My Todo Dashboard</h2>

        <div className="todo-input">
          <TextField
            label="New Todo"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button className="add-btn" onClick={addTodo}>
            Add
          </Button>
        </div>

        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t._id} className="todo-item">
              <span>{t.title}</span>
              <Button
                size="small"
                color="error"
                onClick={() => deleteTodo(t._id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>

        <Button className="logout-btn" onClick={logout}>
          Logout
        </Button>
      </Card>
    </Container>
  );
}
