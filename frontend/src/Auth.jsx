import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    if (isLogin) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.reload();
    } else {
      setIsLogin(true);
    }
  };

  const isDisabled = !email || !password;

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <CardContent>
          <Typography className="auth-title">
            {isLogin ? "Login to your account" : "Create a new account"}
          </Typography>

          <Typography className="auth-subtitle">
            {isLogin
              ? "Good to see you again."
              : "It only takes a few seconds."}
          </Typography>

          <TextField
            label="Email address"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         
          {error && (
            <Typography className="auth-error">
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            className="auth-btn"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {isLogin ? "Continue" : "Create account"}
          </Button>

          <Typography
            className="auth-toggle"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Login"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
