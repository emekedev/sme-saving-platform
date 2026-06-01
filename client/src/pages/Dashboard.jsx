import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } =
    useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        SME Dashboard
      </h1>

      <p>{user?.fullName}</p>

      <p>{user?.email}</p>

      <button
        onClick={handleLogout}
        className="border p-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;