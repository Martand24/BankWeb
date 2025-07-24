import { motion } from "framer-motion";

const colorMap = {
  blue: "border-blue-500",
  green: "border-green-500",
  red: "border-red-500",
  yellow: "border-yellow-500",
  purple: "border-purple-500",
  emerald: "border-emerald-500",
  gray: "border-gray-500",
};

export default function Card({ title, value, color = "blue", icon = null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 border-l-4 ${colorMap[color] || colorMap.blue}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
