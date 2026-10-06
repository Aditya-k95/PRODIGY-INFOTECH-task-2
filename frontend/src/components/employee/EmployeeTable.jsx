import React from 'react';
import Badge from '../common/Badge';
import { TableSkeleton } from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import {
  formatDate,
  formatCurrency,
  getInitials,
  getAvatarColor,
} from '../../utils/formatters';
import {
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Mail,
  Phone,
} from 'lucide-react';

const EmployeeTable = ({
  employees = [],
  isLoading = false,
  pagination = {},
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-holly/10 overflow-hidden shadow-subtle">
        <TableSkeleton rows={6} />
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <EmptyState
        title="No employee records found"
        description="Try adjusting your search criteria, filters, or register a new team member."
        actionText="Add Employee"
        onAction={onAddNew}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-holly/10 overflow-hidden shadow-subtle">
      {/* Table responsive container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-holly text-alabaster border-b border-holly">
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70">
                Employee
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70">
                Badge ID
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70 hidden sm:table-cell">
                Contact
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70">
                Department & Role
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70 hidden md:table-cell">
                Joined
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70">
                Status
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-alabaster/70 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-holly/10 text-xs">
            {employees.map((emp) => {
              const avatar = getAvatarColor(emp.fullName);

              return (
                <tr
                  key={emp._id}
                  className="hover:bg-alabaster/60 transition-colors group"
                >
                  {/* Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border shadow-subtle transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: avatar.bg,
                          color: avatar.text,
                          borderColor: avatar.border,
                        }}
                      >
                        {getInitials(emp.fullName)}
                      </div>
                      <div className="min-w-0">
                        <button
                          onClick={() => onView(emp)}
                          className="font-bold text-holly hover:text-holly-light text-left text-sm truncate block"
                        >
                          {emp.fullName}
                        </button>
                        <span className="text-[11px] text-holly/55 truncate block">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-semibold text-xs text-holly bg-alabaster px-2 py-1 rounded-lg border border-holly/10">
                      {emp.employeeId}
                    </span>
                  </td>

                  {/* Contact Info (Phone) */}
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <div className="space-y-0.5">
                      <span className="text-holly/80 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-dusty-teal-600" />
                        {emp.phone}
                      </span>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-holly">
                        {emp.designation}
                      </p>
                      <p className="text-[11px] font-medium text-dusty-teal-600">
                        {emp.department}
                      </p>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 text-holly/70 hidden md:table-cell font-medium">
                    {formatDate(emp.joiningDate)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <Badge status={emp.status} />
                  </td>

                  {/* Action buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(emp)}
                        className="p-1.5 rounded-lg text-holly/70 hover:text-holly hover:bg-alabaster transition-colors"
                        title="View employee profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        className="p-1.5 rounded-lg text-holly/70 hover:text-holly hover:bg-dusty-teal/20 transition-colors"
                        title="Edit employee details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(emp)}
                        className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Delete employee record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-holly/10 bg-white">
          <p className="text-xs text-holly/60">
            Page <span className="font-bold text-holly">{pagination.currentPage}</span> of{' '}
            <span className="font-bold text-holly">{pagination.totalPages}</span> ({pagination.totalEmployees} total records)
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-holly/15 text-xs font-semibold text-holly hover:bg-alabaster disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pg) => {
              // Show only relevant pages around current page
              if (
                pg === 1 ||
                pg === pagination.totalPages ||
                (pg >= pagination.currentPage - 1 && pg <= pagination.currentPage + 1)
              ) {
                return (
                  <button
                    key={pg}
                    onClick={() => onPageChange(pg)}
                    className={`
                      w-8 h-8 rounded-xl text-xs font-bold transition-all
                      ${
                        pagination.currentPage === pg
                          ? 'bg-holly text-soft-lime shadow-sm'
                          : 'text-holly hover:bg-alabaster border border-transparent'
                      }
                    `}
                  >
                    {pg}
                  </button>
                );
              }
              if (
                pg === pagination.currentPage - 2 ||
                pg === pagination.currentPage + 2
              ) {
                return (
                  <span key={pg} className="px-1 text-xs text-holly/40">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-holly/15 text-xs font-semibold text-holly hover:bg-alabaster disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
