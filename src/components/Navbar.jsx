import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaWallet, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Initialize dark mode from localStorage or system preference
    const [darkMode, setDarkMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

    return (
        <nav className="glass-panel border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400 no-underline hover:opacity-80 transition-opacity">
                        <FaWallet className="text-2xl" />
                        <span>Fintech</span>
                    </Link>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${isActive
                                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/analytics"
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${isActive
                                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                Analytics
                            </NavLink>
                        </div>
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* User Actions */}
                        {currentUser && (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-slate-700">
                                <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <FaUserCircle size={20} className="text-gray-400" />
                                    <span className="font-medium">{currentUser.email?.split('@')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <FaSignOutAlt size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sm:hidden pb-3">
                    <div className="grid grid-cols-2 gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-xs font-semibold text-center no-underline transition-colors ${isActive
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                                    : 'text-gray-700 dark:text-gray-300 bg-stone-100 dark:bg-slate-800'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-xs font-semibold text-center no-underline transition-colors ${isActive
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                                    : 'text-gray-700 dark:text-gray-300 bg-stone-100 dark:bg-slate-800'
                                }`
                            }
                        >
                            Analytics
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
