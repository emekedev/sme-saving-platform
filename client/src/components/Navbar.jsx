import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      {/* LEFT: LOGO */}
      <div className="text-xl font-bold">
        SME Vault
      </div>

      {/* MIDDLE: MENU */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:underline">
          Structured Financing
        </Link>

        <Link to="/" className="hover:underline">
          Simplified Savings
        </Link>
      </div>

      {/* RIGHT: BUTTON */}
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 border rounded"
      >
        Login / Register
      </button>
    </nav>
  );
};

export default Navbar;