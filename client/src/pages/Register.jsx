import { useState } from "react";
import authService from "../services/authService";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    password: "",
    role: "sme",
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
        await authService.register(formData);

      console.log(response);

      alert("Registration successful");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="businessName"
          placeholder="Business Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="sme">
            SME
          </option>

          <option value="agent">
            Agent
          </option>
        </select>

        <button
  type="submit"
  className="border p-2 disabled:opacity-50"
  disabled={loading}
>
  {loading ? "Creating account..." : "Register"}
</button>
      </form>
    </div>
  );
};

export default Register;