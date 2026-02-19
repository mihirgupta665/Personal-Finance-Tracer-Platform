import React from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { FaArrowUp, FaArrowDown, FaDollarSign } from 'react-icons/fa';

export default function SummaryCards() {
    const { transactions } = useFinance();

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const balance = income - expense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="card border-l-4 border-amber-500">
                <div className="flex-between">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Balance</p>
                        <h3 className="text-2xl font-bold mt-1">${balance.toFixed(2)}</h3>
                    </div>
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400">
                        <FaDollarSign size={24} />
                    </div>
                </div>
            </div>

            {/* Income Card */}
            <div className="card border-l-4 border-green-500">
                <div className="flex-between">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Income</p>
                        <h3 className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                            +${income.toFixed(2)}
                        </h3>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <FaArrowUp size={24} />
                    </div>
                </div>
            </div>

            {/* Expense Card */}
            <div className="card border-l-4 border-red-500">
                <div className="flex-between">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Expenses</p>
                        <h3 className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                            -${expense.toFixed(2)}
                        </h3>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                        <FaArrowDown size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
}
