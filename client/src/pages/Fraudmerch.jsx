import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FraudMerchantsPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🚨 Fraudulent Merchants</h2>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Show merchants with frauds greater than:
          </label>
          <input
            type="number"
            value={search}
            onChange={handleFilter}
            placeholder="Enter fraud threshold"
            className="border border-gray-300 p-2 rounded w-full max-w-sm"
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
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
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

export default FraudMerchantsPage;
