import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, color = "indigo" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 border-l-4 border-${color}-500`}
  >
    <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
    <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
  </motion.div>
);

export default function Home() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("http://144.24.146.33:8000/admin/stats")
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
    return <div className="text-center mt-10 text-gray-600 dark:text-gray-300">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 mt-6 text-center">
      Bank Admin Dashboard
      </h1>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white ml-3">Welcome John Smith!</h3>\
      <br></br><br />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        <StatCard
          title=" Total Transaction Volume"
          value={`₹${stats.total_transaction_volume.toFixed(2)}`}
          color="blue"
        />
        <StatCard
          title=" Successful Transactions"
          value={stats.successful_transactions}
          color="green"
        />
        {/* <StatCard
          title=" Failed Transactions"
          value={stats.failed_transactions}
          color="red"
        /> */}
        <StatCard
          title=" Pending Admin Reviews"
          value={stats.pending_admin_reviews}
          color="purple"
        />
        {/* <StatCard
          title=" Total Users"
          value={stats.total_users}
          color="yellow"
        />
        <StatCard
          title=" New Users Today"
          value={`+${stats.users_added_today}`}
          color="emerald"
        /> */}
        <StatCard
          title=" Fraud % (Overall)"
          value={`${(stats.overall_fraud_rate * 100).toFixed(2)}%`}
          color="rose"
        />
        {/* <StatCard
          title=" Detection Success Rate"
          value={`${(stats.fraud_detection_success_rate * 100).toFixed(1)}%`}
          color="indigo"
        /> */}
      </div>

    </div>
  );
}
