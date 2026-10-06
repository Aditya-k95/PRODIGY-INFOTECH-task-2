import React from 'react';
import { Search, Filter, RotateCcw, UserPlus } from 'lucide-react';
import { DEPARTMENTS, EMPLOYMENT_STATUSES } from '../../utils/constants';

const EmployeeFilterBar = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
  onResetFilters,
  onAddEmployee,
  totalResults,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-holly/10 shadow-subtle space-y-4">
      {/* Top row: Search input and Add Employee CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-holly/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, employee ID, email, or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-alabaster/70 text-holly text-sm rounded-xl border border-holly/15 focus:outline-none focus:ring-2 focus:ring-holly focus:border-transparent placeholder:text-holly/40 transition-all"
          />
        </div>

        {/* Primary CTA: Add Employee */}
        <button
          onClick={onAddEmployee}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-soft-lime text-holly font-bold text-xs uppercase tracking-wider hover:bg-soft-lime-400 border border-soft-lime-400 shadow-sm hover:shadow-glow-lime/50 transition-all shrink-0 active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4 text-holly" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Bottom row: Filters, Sorting, and Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-holly/10">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-holly/60 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Department Filter */}
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-alabaster text-holly rounded-lg border border-holly/15 focus:outline-none focus:ring-1 focus:ring-holly cursor-pointer hover:border-holly/30 transition-colors"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-alabaster text-holly rounded-lg border border-holly/15 focus:outline-none focus:ring-1 focus:ring-holly cursor-pointer hover:border-holly/30 transition-colors"
          >
            <option value="all">All Statuses</option>
            {EMPLOYMENT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-alabaster text-holly rounded-lg border border-holly/15 focus:outline-none focus:ring-1 focus:ring-holly cursor-pointer hover:border-holly/30 transition-colors"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="fullName-asc">Name (A-Z)</option>
            <option value="fullName-desc">Name (Z-A)</option>
            <option value="salary-desc">Highest Salary</option>
            <option value="salary-asc">Lowest Salary</option>
            <option value="joiningDate-desc">Recent Join Date</option>
          </select>

          {(search || department !== 'all' || status !== 'all' || sortBy !== 'createdAt-desc') && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {totalResults !== undefined && (
          <div className="text-xs text-holly/60 font-medium">
            Showing <span className="font-bold text-holly">{totalResults}</span> employee record{totalResults === 1 ? '' : 's'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeFilterBar;
