
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const user = {
    name: "John Smith",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/40?img=12",
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/insights", name: "Insights" },
    { path: "/analytics", name: "Analytics" },
    { path: "/fraudtransactionslive", name: "Approve Transactions" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600 dark:text-white">
          <Link to="/">UCO BANK</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-gray-600 dark:text-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:underline transition ${
                    isActive ? "font-bold underline text-indigo-600 dark:text-indigo-400" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ml-4">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="relative">
            <img
              src={user.avatar}
              alt="profile"
              className="w-9 h-9 rounded-full cursor-pointer border-2 border-indigo-500"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <User className="text-indigo-500" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                    <p className=" text-gray-800 dark:text-white">Administrator</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="w-full bg-red-100 text-red-600 hover:bg-red-200 py-1 px-3 rounded-md flex items-center gap-2 justify-center"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <ul className="md:hidden px-4 pt-4 pb-2 space-y-2 bg-indigo-50 dark:bg-gray-800 text-gray-800 dark:text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-2 rounded hover:underline ${
                    isActive ? "font-bold underline text-indigo-600 dark:text-indigo-400" : ""
                  }`
                }
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
