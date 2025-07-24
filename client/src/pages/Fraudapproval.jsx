import { useState } from "react";
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
  const [transactions, setTransactions] = useState(dummyFraudTransactions);

  const handleAction = (id, action) => {
    const updated = transactions.map((txn) =>
      txn.id === id ? { ...txn, status: action } : txn
    );
    setTransactions(updated);
  };

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
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.user}</td>
                <td className="p-3">${txn.amount}</td>
                <td className="p-3">{txn.category}</td>
                <td className="p-3">{txn.date}</td>
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
                    onClick={() => handleAction(txn.id, "Accepted")}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={txn.status !== "Pending"}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleAction(txn.id, "Rejected")}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                    disabled={txn.status !== "Pending"}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
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
