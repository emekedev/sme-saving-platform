import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response =
        await authService.login(formData);

      login(response);

      if (response.role === "agent") {
        navigate("/agent-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert("Login failed");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
  type="submit"
  className="border p-2 disabled:opacity-50"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>
      </form>
    </div>
  );
};

export default Login;