import {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletRes = await walletService.getWallet();
        const txRes = await transactionService.getTransactions();

        setWallet(walletRes);
        setTransactions(txRes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

        {/* WALLET */}
       <div className="mt-4 p-4 border rounded">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <p className="text-xl">
          ₦{wallet?.balance || 0}
        </p>
      </div>

      {/* TRANSACTIONS */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Transactions
        </h2>

        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="border p-2 mb-2 rounded"
          >
            <p>{tx.type.toUpperCase()}</p>
            <p>₦{tx.amount}</p>
            <p>{tx.description}</p>
          </div>
        ))}
      </div>

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