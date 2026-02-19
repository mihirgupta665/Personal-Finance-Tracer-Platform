import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';

export default function FinancialCharts() {
    const { transactions } = useFinance();
    const [expenseChartType, setExpenseChartType] = useState('histogram');

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const data = [
        { name: 'Income', value: income },
        { name: 'Expense', value: expense },
    ];

    const overviewColors = ['#10b981', '#ef4444'];
    const categoryColors = ['#6366f1', '#f59e0b', '#14b8a6', '#ec4899', '#22c55e', '#ef4444', '#3b82f6', '#8b5cf6'];
    const dailyExpenseColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899'];

    const categoryMap = transactions.reduce((acc, tx) => {
        const key = tx.category || 'Other';
        acc[key] = (acc[key] || 0) + Number(tx.amount || 0);
        return acc;
    }, {});
    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    const expenseByDayMap = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => {
            const txDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
            if (Number.isNaN(txDate.getTime())) return acc;
            const key = format(txDate, 'yyyy-MM-dd');
            acc[key] = (acc[key] || 0) + Number(tx.amount || 0);
            return acc;
        }, {});
    const expenseByDayData = Object.entries(expenseByDayMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, value]) => ({
            date,
            day: format(new Date(date), 'MMM d'),
            value,
        }));
    const hasOverviewData = income > 0 || expense > 0;
    const hasCategoryData = categoryData.length > 0;
    const hasExpenseByDayData = expenseByDayData.length > 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card h-[22rem] sm:h-[26rem] flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Financial Overview</h3>
                    <div className="flex-1 min-h-0">
                        {hasOverviewData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="46%"
                                        innerRadius={60}
                                        outerRadius={74}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={overviewColors[index % overviewColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `$${value.toFixed(2)}`}
                                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                        itemStyle={{ color: 'var(--text-primary)' }}
                                    />
                                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex-center text-stone-400">No data to display</div>
                        )}
                    </div>
                </div>

                <div className="card h-[22rem] sm:h-[26rem] flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Category Breakdown</h3>
                    <div className="flex-1 min-h-0">
                        {hasCategoryData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="46%"
                                        innerRadius={54}
                                        outerRadius={74}
                                        fill="#8884d8"
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`category-cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `$${value.toFixed(2)}`}
                                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                        itemStyle={{ color: 'var(--text-primary)' }}
                                    />
                                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex-center text-stone-400">No category data available</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card h-[26rem] sm:h-[28rem] flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Day-wise Expense Trend</h3>
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-4">
                    <div className="grid grid-cols-1 gap-2 w-full max-w-[180px] lg:max-w-none">
                        <button
                            onClick={() => setExpenseChartType('histogram')}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${expenseChartType === 'histogram'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                                }`}
                        >
                            Histogram
                        </button>
                        <button
                            onClick={() => setExpenseChartType('line')}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${expenseChartType === 'line'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                                }`}
                        >
                            Line
                        </button>
                        <button
                            onClick={() => setExpenseChartType('area')}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${expenseChartType === 'area'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                                }`}
                        >
                            Area
                        </button>
                    </div>
                    <div className="min-h-0">
                        {hasExpenseByDayData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                    {expenseChartType === 'histogram' && (
                                        <BarChart data={expenseByDayData} margin={{ top: 8, right: 20, left: 20, bottom: 24 }} barCategoryGap="45%">
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                            <XAxis
                                                dataKey="day"
                                                height={56}
                                                angle={-20}
                                                textAnchor="end"
                                                interval="preserveStartEnd"
                                                minTickGap={24}
                                                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                            />
                                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                            <Tooltip
                                                formatter={(value) => `$${Number(value).toFixed(2)}`}
                                                labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                                itemStyle={{ color: 'var(--text-primary)' }}
                                            />
                                            <Bar dataKey="value" name="Expense" radius={[6, 6, 0, 0]} barSize={24} maxBarSize={28}>
                                                {expenseByDayData.map((entry, index) => (
                                                    <Cell key={`expense-bar-${entry.date}`} fill={dailyExpenseColors[index % dailyExpenseColors.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    )}
                                    {expenseChartType === 'line' && (
                                        <LineChart data={expenseByDayData} margin={{ top: 8, right: 20, left: 20, bottom: 24 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                            <XAxis
                                                dataKey="day"
                                                height={56}
                                                angle={-20}
                                                textAnchor="end"
                                                interval="preserveStartEnd"
                                                minTickGap={24}
                                                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                            />
                                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                            <Tooltip
                                                formatter={(value) => `$${Number(value).toFixed(2)}`}
                                                labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                                itemStyle={{ color: 'var(--text-primary)' }}
                                            />
                                            <Line type="monotone" dataKey="value" name="Expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                                        </LineChart>
                                    )}
                                    {expenseChartType === 'area' && (
                                        <AreaChart data={expenseByDayData} margin={{ top: 8, right: 20, left: 20, bottom: 24 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                            <XAxis
                                                dataKey="day"
                                                height={56}
                                                angle={-20}
                                                textAnchor="end"
                                                interval="preserveStartEnd"
                                                minTickGap={24}
                                                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                            />
                                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                            <Tooltip
                                                formatter={(value) => `$${Number(value).toFixed(2)}`}
                                                labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                                itemStyle={{ color: 'var(--text-primary)' }}
                                            />
                                            <Area type="monotone" dataKey="value" name="Expense" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} strokeWidth={2.5} />
                                        </AreaChart>
                                    )}
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex-center text-stone-400">No expense data available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
