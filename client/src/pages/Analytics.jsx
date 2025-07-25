
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

const getXAxisLabels = (range) => {
  switch (range) {
    case '24h':
      return Array.from({ length: 24 }, (_, i) => `${i + 1}h`);
    case 'Week':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'Month':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    case '6 Months':
      return ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    case '1 Year':
      return ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
    case 'Max':
      return ['2019', '2020', '2021', '2022', '2023', '2024'];
    default:
      return [];
  }
};

const generateChartData = (range) => {
  const labels = getXAxisLabels(range);
  return labels.map((label) => ({
    label,
    value: Math.floor(Math.random() * 100),
  }));
};

const pieData = [
  { name: "Approved", value: 400 },
  { name: "Rejected", value: 300 },
  { name: "Pending", value: 300 },
];
const pieData1 = [
  {name: "Approved", value: 300},
  {name : "Rejected", value: 500},
  {name: "Pending", value:300}
]

const COLORS = ["#34d399", "#f87171", "#facc15"];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("24h");

  const chartData = generateChartData(timeRange);

  const renderTimeButtons = () => {
    const ranges = ["24h", "Week", "Month", "6 Months", "1 Year", "Max"];
    return (
      <div className="flex gap-2 mb-4 justify-end">
        {ranges.map((range) => (
          <button
            key={range}
            className={`px-3 py-1 rounded-md border ${
              timeRange === range ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6 dark:from-gray-900 dark:to-gray-800">
    <Navbar />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center mt-6">
        Analytics
      </h1>
      {renderTimeButtons()}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Line Graph */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Fraudulent Transactions Over Time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="label" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Fraud Distribution by Day
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Transaction Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Another Line Chart */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Suspicious Logins Detected
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="label" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Another Histogram */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Fraud Amount per Day
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Another Pie Chart */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Merchant Fraud Contribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData1}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
