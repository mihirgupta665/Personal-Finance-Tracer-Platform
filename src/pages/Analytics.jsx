import React from 'react';
import Navbar from '../components/Navbar';
import FinancialCharts from '../components/FinancialCharts';
import Footer from '../components/Footer';

export default function Analytics() {
    return (
        <div className="min-h-screen dark:bg-slate-900 pb-44">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="card p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                        Visual insights for income, expenses, categories, and day-wise expense trends.
                    </p>
                </div>

                <FinancialCharts />
            </main>

            <Footer />
        </div>
    );
}
