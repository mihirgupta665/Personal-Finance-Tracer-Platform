import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import Filters from '../components/Filters';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { FaPlus } from 'react-icons/fa';
import Footer from '../components/Footer';

export default function Dashboard() {
    const { transactions } = useFinance();
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
    });

    function handleEdit(transaction) {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingTransaction(null);
    }

    return (
        <div className="min-h-screen dark:bg-slate-900 pb-44">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="animate-fade-in">
                    <SummaryCards />
                </div>

                <div className="card p-6 animate-fade-in delay-100">
                    <div className="flex-between gap-4 flex-wrap">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Transactions</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hidden sm:flex btn btn-primary flex-center gap-2 w-auto px-6 py-3 whitespace-nowrap self-start"
                        >
                            <FaPlus />
                            <span className="hidden sm:inline">Add Transaction</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="animate-fade-in delay-200">
                        <Filters
                            search={search}
                            setSearch={setSearch}
                            filterType={filterType}
                            setFilterType={setFilterType}
                            filterCategory={filterCategory}
                            setFilterCategory={setFilterCategory}
                        />
                    </div>

                    <div className="animate-fade-in delay-300">
                        <TransactionList
                            transactions={filteredTransactions}
                            onEdit={handleEdit}
                        />
                    </div>
                </div>

            </main>

            <Footer />

            {isModalOpen && (
                <TransactionForm
                    onClose={handleCloseModal}
                    editTransaction={editingTransaction}
                />
            )}

            {/* Floating Action Button for Mobile */}
            <button
                onClick={() => setIsModalOpen(true)}
                aria-label="Add transaction"
                className="fixed bottom-40 right-5 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full border-2 border-white/80 dark:border-slate-900/70 shadow-xl flex-center sm:hidden z-40 transition-all active:scale-95"
            >
                <FaPlus size={18} />
            </button>
        </div>
    );
}
