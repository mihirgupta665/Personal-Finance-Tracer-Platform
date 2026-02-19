import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaWallet, FaUserPlus } from 'react-icons/fa';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex dark:bg-slate-900">
            {/* Left Side - Hero/Brand (Order varies on mobile/desktop) */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 to-indigo-600 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-2xl font-bold mb-6">
                        <FaWallet className="text-indigo-200" />
                        <span>Fintech</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Join thousands of users<br /> today.
                    </h1>
                    <p className="text-indigo-100 text-xl max-w-md">
                        Start your journey towards financial freedom. Create an account and take control of your transactions in minutes.
                    </p>
                </div>

                {/* Abstract shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/30 blur-3xl"></div>

                <div className="relative z-10 text-sm text-indigo-200">
                    © 2024 Fintech. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Mobile Logo */}
                <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    <FaWallet />
                    <span>Fintech</span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Sign up to get started with Fintech.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                            <input
                                type="email"
                                ref={emailRef}
                                className="input py-3"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                ref={passwordRef}
                                className="input py-3"
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                ref={passwordConfirmRef}
                                className="input py-3"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform active:scale-95 mt-4"
                        >
                            <span className="flex items-center gap-2">
                                {loading ? 'Creating account...' : 'Create Account'}
                                {!loading && <FaUserPlus />}
                            </span>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
