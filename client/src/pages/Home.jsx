import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const dummyStats = {
  transactionsToday: 3540,
  totalUsers: 105670,
  usersToday: 120,
  newUsersToday: 75,
  fraudsToday: 12,
  fraudPercentage: 0.34,
  detectionRate: 0.93,
};

const chartData = [
  { day: "Mon", frauds: 8 },
  { day: "Tue", frauds: 10 },
  { day: "Wed", frauds: 12 },
  { day: "Thu", frauds: 5 },
  { day: "Fri", frauds: 14 },
  { day: "Sat", frauds: 9 },
  { day: "Sun", frauds: 6 },
];

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
  const stats = dummyStats;

  return (
    <div className="p-6 bg-gradient-to-br from-[#f5f8ff] via-[#e8f0fe] to-[#fdfdff] bg-fixed animate-gradient dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
    <Navbar />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 mt-6 text-center">🏦 Bank Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="🧾 Daily Transactions" value={stats.transactionsToday} color="blue" />
        <StatCard title="👥 Total Users / Today" value={`${stats.totalUsers} / +${stats.usersToday}`} color="green" />
        <StatCard title="🆕 New Users Today" value={stats.newUsersToday} color="purple" />
        <StatCard title="⚠️ Frauds Detected Today" value={stats.fraudsToday} color="red" />
        <StatCard
          title="📊 Fraud % Today"
          value={`${(stats.fraudPercentage * 100).toFixed(2)}%`}
          color="yellow"
        />
        <StatCard
          title="✅ Detection Success Rate"
          value={`${(stats.detectionRate * 100).toFixed(1)}%`}
          color="emerald"
        />
      </div>


    </div>
  );
}


      {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          📅 Fraud Activity This Week
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frauds" fill="#f87171" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div> */}


//       import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const StatCard = ({ title, value, color = "indigo" }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.4 }}
//     className={`rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 border-l-4 border-${color}-500`}
//   >
//     <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
//     <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
//   </motion.div>
// );

// export default function Home() {
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8000/admin/stats")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch stats");
//         return res.json();
//       })
//       .then((data) => setStats(data))
//       .catch((err) => setError(err.message));
//   }, []);

//   if (error) {
//     return <div className="text-center text-red-600 mt-10">{error}</div>;
//   }

//   if (!stats) {
//     return <div className="text-center mt-10 text-gray-600 dark:text-gray-300">Loading dashboard...</div>;
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
//       <Navbar />
//       <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 mt-6 text-center">
//         🏦 Bank Admin Dashboard
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <StatCard
//           title="💰 Total Transaction Volume"
//           value={`$${stats.total_transaction_volume.toFixed(2)}`}
//           color="blue"
//         />
//         <StatCard
//           title="✅ Successful Transactions"
//           value={stats.successful_transactions}
//           color="green"
//         />
//         <StatCard
//           title="❌ Failed Transactions"
//           value={stats.failed_transactions}
//           color="red"
//         />
//         <StatCard
//           title="🕒 Pending Admin Reviews"
//           value={stats.pending_admin_reviews}
//           color="purple"
//         />
//         <StatCard
//           title="👥 Total Users"
//           value={stats.total_users}
//           color="yellow"
//         />
//         <StatCard
//           title="🆕 New Users Today"
//           value={`+${stats.users_added_today}`}
//           color="emerald"
//         />
//         <StatCard
//           title="📉 Fraud % (Overall)"
//           value={`${(stats.overall_fraud_rate * 100).toFixed(2)}%`}
//           color="rose"
//         />
//         <StatCard
//           title="🔍 Detection Success Rate"
//           value={`${(stats.fraud_detection_success_rate * 100).toFixed(1)}%`}
//           color="indigo"
//         />
//       </div>

//       <Footer />
//     </div>
//   );
// }
