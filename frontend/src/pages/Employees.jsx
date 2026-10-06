import React, { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../services/employeeService';
import EmployeeFilterBar from '../components/employee/EmployeeFilterBar';
import EmployeeTable from '../components/employee/EmployeeTable';
import EmployeeFormModal from '../components/employee/EmployeeFormModal';
import EmployeeDetailModal from '../components/employee/EmployeeDetailModal';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
import Toast from '../components/common/Toast';
import { Download, RefreshCw } from 'lucide-react';
import Button from '../components/common/Button';

const Employees = ({
  isAddModalOpenFromLayout = false,
  onCloseAddModalFromLayout,
}) => {
  // Data state
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState(null);
  const [selectedEmployeeForView, setSelectedEmployeeForView] = useState(null);
  const [selectedEmployeeForDelete, setSelectedEmployeeForDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Synchronize modal open from layout if triggered from navbar/sidebar
  useEffect(() => {
    if (isAddModalOpenFromLayout) {
      setSelectedEmployeeForEdit(null);
      setIsFormModalOpen(true);
    }
  }, [isAddModalOpenFromLayout]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch employees from backend
  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);

    const [field, order] = sortBy.split('-');

    try {
      const res = await employeeService.getEmployees({
        search: search.trim() || undefined,
        department: department !== 'all' ? department : undefined,
        status: status !== 'all' ? status : undefined,
        sortBy: field,
        sortOrder: order,
        page: currentPage,
        limit: 10,
      });

      setEmployees(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to fetch employees from server.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [search, department, status, sortBy, currentPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEmployees();
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [fetchEmployees]);

  // Handle Search Change
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Handle Department Change
  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  // Handle Status Change
  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Handle Sort Change
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setDepartment('all');
    setStatus('all');
    setSortBy('createdAt-desc');
    setCurrentPage(1);
  };

  // Open Add Employee Modal
  const handleOpenAddModal = () => {
    setSelectedEmployeeForEdit(null);
    setIsFormModalOpen(true);
  };

  // Open Edit Employee Modal
  const handleOpenEditModal = (employee) => {
    setSelectedEmployeeForEdit(employee);
    setIsFormModalOpen(true);
  };

  // Open View Details Modal
  const handleOpenViewModal = (employee) => {
    setSelectedEmployeeForView(employee);
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployeeForDelete(employee);
  };

  // Submit Add or Edit Form
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedEmployeeForEdit) {
        // Update existing employee
        const res = await employeeService.updateEmployee(
          selectedEmployeeForEdit._id,
          formData
        );
        showToast(
          res.message || `Employee ${formData.fullName} updated successfully!`,
          'success'
        );
      } else {
        // Create new employee
        const res = await employeeService.createEmployee(formData);
        showToast(
          res.message || `Employee ${formData.fullName} registered successfully!`,
          'success'
        );
      }

      setIsFormModalOpen(false);
      setSelectedEmployeeForEdit(null);
      if (onCloseAddModalFromLayout) onCloseAddModalFromLayout();
      fetchEmployees();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to save employee record.';
      showToast(errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!selectedEmployeeForDelete) return;

    setIsSubmitting(true);
    try {
      const res = await employeeService.deleteEmployee(
        selectedEmployeeForDelete._id
      );
      showToast(
        res.message ||
          `Employee record for ${selectedEmployeeForDelete.fullName} (${selectedEmployeeForDelete.employeeId}) has been deleted.`,
        'success'
      );
      setSelectedEmployeeForDelete(null);
      fetchEmployees();
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to delete employee record.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export records to CSV
  const handleExportCSV = () => {
    if (!employees || employees.length === 0) return;

    const headers = ['Employee ID,Full Name,Email,Phone,Department,Designation,Salary,Joining Date,Status\n'];
    const rows = employees.map((e) =>
      `"${e.employeeId}","${e.fullName}","${e.email}","${e.phone}","${e.department}","${e.designation}","${e.salary}","${new Date(e.joiningDate).toISOString().split('T')[0]}","${e.status}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `employees_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Employee dataset exported to CSV.', 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-holly tracking-tight">
            Employee Directory & Workforce Management
          </h2>
          <p className="text-xs text-holly/60 mt-0.5">
            Administer employee lifecycle, roles, departmental assignments, and personnel records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExportCSV}
            disabled={employees.length === 0}
            title="Export filtered records to CSV"
          >
            Export CSV
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={fetchEmployees}
            title="Refresh Table"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <EmployeeFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        department={department}
        onDepartmentChange={handleDepartmentChange}
        status={status}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
        onAddEmployee={handleOpenAddModal}
        totalResults={pagination.totalEmployees}
      />

      {/* Error Banner */}
      {apiError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
          <span>{apiError}</span>
          <Button size="sm" variant="outline" onClick={fetchEmployees}>
            Retry
          </Button>
        </div>
      )}

      {/* Employee Table */}
      <EmployeeTable
        employees={employees}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={(page) => setCurrentPage(page)}
        onView={handleOpenViewModal}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onAddNew={handleOpenAddModal}
      />

      {/* Add / Edit Modal */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedEmployeeForEdit(null);
          if (onCloseAddModalFromLayout) onCloseAddModalFromLayout();
        }}
        onSubmit={handleFormSubmit}
        employee={selectedEmployeeForEdit}
        isLoading={isSubmitting}
      />

      {/* Detail Modal */}
      <EmployeeDetailModal
        isOpen={Boolean(selectedEmployeeForView)}
        onClose={() => setSelectedEmployeeForView(null)}
        employee={selectedEmployeeForView}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(selectedEmployeeForDelete)}
        onClose={() => setSelectedEmployeeForDelete(null)}
        onConfirm={handleConfirmDelete}
        employee={selectedEmployeeForDelete}
        isLoading={isSubmitting}
      />

      {/* Toast feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Employees;
