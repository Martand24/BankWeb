import { useEffect, useState } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
const SuspiciousUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

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
    const [merchants, setMerchants] = useState([]);
  const [search, setSearch] = useState(0);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Replace with API call
    const mockMerchants = [
      { name: "Shopify Central", frauds: 45 },
      { name: "FastFoodie", frauds: 12 },
      { name: "TravelGenie", frauds: 33 },
      { name: "CryptoMall", frauds: 60 },
      { name: "MediPlus Pharmacy", frauds: 9 },
      { name: "GamerNation", frauds: 21 },
    ];
    setMerchants(mockMerchants);
    setFiltered(mockMerchants);
  }, []);

  const handleFilter = (e) => {
    const val = parseInt(e.target.value || 0);
    setSearch(val);
    const result = merchants.filter((m) => m.frauds >= val);
    setFiltered(result);
  };

  return (
    <div className="min-h-screen dark:text-white bg-gradient-to-br from-[#f5f8ff] via-[#e8f0fe] to-[#fdfdff] bg-fixed animate-gradient dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
    <Navbar />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-6 text-center mt-6"> Suspicious Users Tracker</h2>

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
          <h3 className="text-xl font-semibold text-gray-800 mb-4"> List of Flagged Users</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">#</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Flagged Date</th>
                {/* <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Reason</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.flaggedAt}</td>
                  {/* <td className="px-4 py-2 text-sm text-red-600 font-semibold">{user.reason}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-black  mb-6 mt-6 dark:text-white text-center"> Fraudulent Merchants</h2>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700 dark:text-white">
            Show merchants with frauds greater than:
          </label>
          <input
            type="number"
            value={search}
            onChange={handleFilter}
            placeholder="Enter fraud threshold"
            className="border border-gray-300 p-2 rounded w-full max-w-sm dark:text-white"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">#</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Merchant Name</th>
                <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Fraud Transactions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((merchant, index) => (
                <tr key={index} className="hover:bg-red-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{merchant.name}</td>
                  <td className="px-4 py-2 text-sm text-red-600 font-bold">{merchant.frauds}</td>
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
