import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-7xl font-extrabold text-pink-600 mb-4">404 😵</h1>
        <p className="text-xl text-gray-800 mb-2">Oops! This page took a coffee break ☕</p>
        <p className="text-md text-gray-600 mb-6">Maybe try turning it off and on again?</p>

        <img
          src="https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif"
          alt="Confused robot"
          className="mx-auto w-64 rounded-lg shadow-md mb-6"
        />

        <Link
          to="/"
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          🔙 Take Me Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
