import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const dummyFraudTransactions = [
  {
    id: "TXN001",
    user: "John Doe",
    amount: 4500,
    category: "Electronics",
    date: "2025-07-15",
    status: "Pending",
  },
  {
    id: "TXN002",
    user: "Jane Smith",
    amount: 9800,
    category: "Luxury Goods",
    date: "2025-07-14",
    status: "Pending",
  },
  {
    id: "TXN003",
    user: "Arjun Patel",
    amount: 1200,
    category: "Gift Cards",
    date: "2025-07-13",
    status: "Pending",
  },
];

export default function FraudTransactionApproval() {
  const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
    fetch("http://144.24.146.33:8000/admin/pending_transactions")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setStats(data);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setError(err.message);
      });
  }, []);
  
  
    if (error) {
      return <div className="text-center text-red-600 mt-10">{error}</div>;
    }
  
    if (!stats) {
      return <div className="text-center mt-10 text-gray-600 dark:text-gray-300">Loading transactions ..</div>;
    }

  const handleAction = (id, action) => {
    const updated = stats.map((txn) =>
      txn.id === id ? { ...txn, status: action } : txn
    );
    setStats(updated);
  };

  function reviewTransaction(id, action, txn) {
  fetch("http://144.24.146.33:8000/admin/review_transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      action: action, // "approve" or "reject"
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Success:", data.message);
        setStats((prevStats) =>
        prevStats.map((txn) =>
          txn.id === id
            ? { ...txn, status: "Awaiting customer confirmation" }
            : txn
        )
      );
    })
    .catch((err) => {
      console.error("Error:", err.message);
              setStats((prevStats) =>
        prevStats.map((txn) =>
          txn.id === id
            ? { ...txn, status: "Rejected" }
            : txn
        )
      );
    }); 
  }


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f5f8ff] via-[#e8f0fe] to-[#fdfdff] bg-fixed animate-gradient dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <Navbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-6 dark:text-white text-center">
         Fraud Transaction Approval Panel
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-purple-200 text-gray-800">
            <tr>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Customer ID</th>
              <th className="p-3 text-left">Merchant ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Fraud Probability</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((txn) => (
              <tr key={txn.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.customer_id}</td>
                <td className="p-3">{txn.merchant_id}</td>
                <td className="p-3">₹{txn.amount}</td>
                <td className="p-3">{txn.fraud_probability}</td>
                
                <td className="p-3">{txn.timestamp}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : txn.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => reviewTransaction(txn.id, "approve", txn)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={txn.status !== "pending"}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => reviewTransaction(txn.id, "reject", txn)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                    disabled={txn.status !== "pending"}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No fraud transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
