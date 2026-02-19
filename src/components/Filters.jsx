import React from 'react';

export default function Filters({ search, setSearch, filterType, setFilterType, filterCategory, setFilterCategory }) {
    return (
        <div className="card mb-6 space-y-4 md:space-y-0 md:flex md:gap-6">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex gap-4">
                <select
                    className="input w-auto cursor-pointer"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    className="input w-auto cursor-pointer"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="General">General</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
    );
}
