import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/suscustomers", name: "Suspicious Users" },
    { path: "/fraudmerchants", name: "Fraud Merchants" },
    { path: "/fraudtransactionslive", name: "Approve Transactions" },
    { path: "/logout", name: "Logout" },
  ];

  return (
<nav className="bg-gradient-to-r from-purple-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md border-b border-purple-300 dark:border-gray-700 text-gray-800 dark:text-white backdrop-blur-lg z-50">

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          UCO BANK
        </Link>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:underline ${
                    isActive ? "font-bold underline" : "font-medium"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-purple-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 hover:underline ${
                    isActive ? "font-bold underline" : "font-medium"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
