import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser({ username, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch {

      setError("Invalid credentials");

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

      <button type="submit">Login</button>

    </form>

    {error && <p className="error">{error}</p>}

  </div>
  );

}

export default Login;