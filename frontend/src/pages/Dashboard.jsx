import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await getProfile(token);

        setUser(res.data);

      } catch {

        localStorage.removeItem("token");
        navigate("/login");

      }

    };

    fetchProfile();

  }, []);

  const handleLogout = async () => {

    await logoutUser(token);

    localStorage.removeItem("token");

    navigate("/login");

  };

  if (!user) return <p>Loading...</p>;

  return (

    <div className="container dashboard">

    <h2>Dashboard</h2>

    <p>Welcome <b>{user.username}</b></p>

    <p>Login Time: {new Date(user.loginTime).toLocaleString()}</p>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

  );

}

export default Dashboard;