import React from 'react';
import { useFinance } from '../contexts/FinanceContext';
import {
    FaEdit,
    FaTrash,
    FaUtensils,
    FaCar,
    FaBolt,
    FaGamepad,
    FaHeartbeat,
    FaMoneyBillWave,
    FaChartLine,
    FaWallet,
    FaTag
} from 'react-icons/fa';
import { format } from 'date-fns';

export default function TransactionList({ transactions, onEdit }) {
    const { deleteTransaction } = useFinance();

    const categoryIconMap = {
        Food: FaUtensils,
        Transport: FaCar,
        Utilities: FaBolt,
        Entertainment: FaGamepad,
        Health: FaHeartbeat,
        Salary: FaMoneyBillWave,
        Investment: FaChartLine,
        General: FaWallet,
        Other: FaTag,
    };

    if (transactions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <p>No transactions found. Add one manually!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {transactions.map((item, index) => (
                <div
                    key={item.id}
                    className="card p-5 flex justify-between items-center group animate-slide-in hover:-translate-y-0.5"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${item.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {(() => {
                                const Icon = categoryIconMap[item.category] || FaTag;
                                return <Icon />;
                            })()}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white capitalize">{item.description}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {format(item.date, 'MMM dd, yyyy')} • {item.category}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className={`font-bold ${item.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
                        </span>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button
                                onClick={() => onEdit(item)}
                                className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors"
                                title="Edit"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => deleteTransaction(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                title="Delete"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
