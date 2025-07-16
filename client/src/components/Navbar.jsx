import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: use `react-icons` or any other icon lib

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-yellow-200">
          UCO BANK
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-200 font-medium">Home</Link>
          <Link to="/submit" className="hover:text-yellow-200 font-medium">Submit Tool</Link>
          <Link to="/login" className="hover:text-yellow-200 font-medium">Login</Link>
          <Link to="/signup" className="hover:text-yellow-200 font-medium"><div className="rounded-full bg-blue-600 px-2 py-1">Signup</div></Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 px-4 pb-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-yellow-200"
          >
            Home
          </Link>
          <Link
            to="/submit"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-yellow-200"
          >
            Submit Tool
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-yellow-200"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
