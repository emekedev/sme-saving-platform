import {useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import walletService from "../services/walletService"
import transactionService from "../services/transactionService"

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const walletRes = await walletService.getWallet();
        const txRes = await transactionService.getTransactions();

        setWallet(walletRes);
        setTransactions(txRes);
      } catch (error) {
        console.error(error);
      }finally {
      setLoading(false);
    }
    };

    fetchData();
  }, []);

    if (loading) {
  return (
    <div className="p-6">
      <h1 className="text-xl">Loading dashboard...</h1>
    </div>
  );
  }

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
     <div className="mt-4 p-6 border rounded-lg shadow-sm bg-white">
  <h2 className="text-sm text-gray-500">Wallet Balance</h2>
  <p className="text-3xl font-bold">
    ₦{wallet?.balance || 0}
  </p>
</div>

      {/* TRANSACTIONS */}
      <div className="mt-6">
  <h2 className="text-lg font-semibold mb-3">
    Transaction History
  </h2>

  {transactions.length === 0 ? (
    <p className="text-gray-500">No transactions yet</p>
  ) : (
    transactions.map((tx) => (
      <div
        key={tx._id}
        className="flex justify-between p-3 border rounded mb-2"
      >
        <div>
          <p className="font-semibold">
            {tx.type.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500">
            {tx.description}
          </p>
        </div>

        <div className="font-bold">
          ₦{tx.amount}
        </div>
      </div>
    ))
  )}
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