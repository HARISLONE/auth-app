import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // CLIENT SIDE VALIDATION
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const res = await loginUser({ username, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {

      setError(err.response?.data?.message || "Login failed");

    } finally {

      setLoading(false);

    }

  };

  return (
  <div className="container">

    <h2>Login</h2>

    <form onSubmit={handleSubmit}>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    {error && <p className="error">{error}</p>}

  </div>
  );

}

export default Login;