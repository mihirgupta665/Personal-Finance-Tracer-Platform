import React, { useState, useEffect } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { FaTimes } from 'react-icons/fa';

export default function TransactionForm({ onClose, editTransaction = null }) {
    const { addTransaction, updateTransaction } = useFinance();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('General');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editTransaction) {
            setDescription(editTransaction.description);
            setAmount(editTransaction.amount);
            setType(editTransaction.type);
            setCategory(editTransaction.category);
            // Format date for input assuming editTransaction.date is a Date object
            const dateStr = editTransaction.date.toISOString().split('T')[0];
            setDate(dateStr);
        }
    }, [editTransaction]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const transactionData = {
            description,
            amount: Number(amount),
            type,
            category,
            date: new Date(date)
        };

        try {
            if (editTransaction) {
                await updateTransaction(editTransaction.id, transactionData);
            } else {
                await addTransaction(transactionData);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save transaction", error);
            alert("Failed to save transaction");
        }
        setLoading(false);
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">
            <div className="card rounded-lg w-full max-w-md relative animate-fade-in shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <input
                            type="text"
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="e.g. Grocery shopping"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                            <select
                                className="input"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select
                            className="input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="General">General</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Salary">Salary</option>
                            <option value="Investment">Investment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                        <input
                            type="date"
                            className="input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn btn-primary mt-2"
                    >
                        {loading ? 'Saving...' : (editTransaction ? 'Update Transaction' : 'Add Transaction')}
                    </button>
                </form>
            </div>
        </div>
    );
}
