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

// Predefined reasons for approval/rejection
const approvalReasons = [
  "Called the customer and confirmed the transaction",
  "Verified with merchant and confirmed legitimacy",
  "Transaction pattern matches customer's normal behavior",
  "Additional documentation provided and verified",
  "Other"
];

const rejectionReasons = [
  "Customer denied making this transaction",
  "Suspicious transaction pattern detected",
  "Merchant verification failed",
  "Insufficient documentation provided",
  "Other"
];

export default function FraudTransactionApproval() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  
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

  const openReasonModal = (action, transaction) => {
    setSelectedAction(action);
    setSelectedTransaction(transaction);
    setSelectedReason("");
    setCustomReason("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
    setSelectedTransaction(null);
    setSelectedReason("");
    setCustomReason("");
  };

  const submitWithReason = () => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }

    const finalReason = selectedReason === "Other" ? customReason : selectedReason;
    
    reviewTransaction(selectedTransaction.id, selectedAction, selectedTransaction, finalReason);
    closeModal();
  };

  function reviewTransaction(id, action, txn, reason) {
    fetch("http://144.24.146.33:8000/admin/review_transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        action: action, // "approve" or "reject"
        reason: reason,
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
              ? { ...txn, status: (action=="approve" ?"Awaiting customer confirmation":"Rejected"), reason: reason }
              : txn
          )
        );
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setStats((prevStats) =>
          prevStats.map((txn) =>
            txn.id === id
              ? { ...txn, status: "Rejected", reason: reason }
              : txn
          )
        );
      }); 
  }

  const getReasonsList = () => {
    return selectedAction === "approve" ? approvalReasons : rejectionReasons;
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
                    onClick={() => openReasonModal("approve", txn)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={txn.status !== "pending"}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => openReasonModal("reject", txn)}
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

      {/* Reason Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {selectedAction === "approve" ? "Approve" : "Reject"} Transaction
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Transaction ID: {selectedTransaction?.id}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Reason:
              </label>
              <div className="space-y-2">
                {getReasonsList().map((reason, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason === "Other" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Custom Reason:
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please provide a detailed reason..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitWithReason}
                disabled={!selectedReason || (selectedReason === "Other" && !customReason.trim())}
                className={`px-4 py-2 text-white rounded-md ${
                  selectedAction === "approve" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-red-500 hover:bg-red-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {selectedAction === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
