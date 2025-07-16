import { useEffect, useState } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";

const SuspiciousUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  // Dummy fetch simulation
  useEffect(() => {
    // Replace with actual API fetch
    const fakeData = [
      { id: 1, name: "Alice Kumar", email: "alice@example.com", flaggedAt: "2025-07-14", reason: "Multiple failed transactions" },
      { id: 2, name: "Bob Verma", email: "bob@example.com", flaggedAt: "2025-07-15", reason: "High-value transactions spike" },
      { id: 3, name: "Charlie Singh", email: "charlie@example.com", flaggedAt: "2025-07-15", reason: "Suspicious login pattern" },
    ];
    setUsers(fakeData);
    setCount(fakeData.length);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🚨 Suspicious Users Tracker</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            title="Suspicious Users Detected Today"
            value={count}
            color="red"
            icon="⚠️"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-x-auto p-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🧍 List of Flagged Users</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">#</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Flagged Date</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.flaggedAt}</td>
                  <td className="px-4 py-2 text-sm text-red-600 font-semibold">{user.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default SuspiciousUsers;
