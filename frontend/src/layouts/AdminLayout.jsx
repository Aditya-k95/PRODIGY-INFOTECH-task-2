import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import EmployeeFormModal from '../components/employee/EmployeeFormModal';
import EmployeeDetailModal from '../components/employee/EmployeeDetailModal';
import Toast from '../components/common/Toast';
import { employeeService } from '../services/employeeService';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inspectedEmployee, setInspectedEmployee] = useState(null);
  const [toast, setToast] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Executive Dashboard';
      case '/employees':
        return 'Employee Management';
      case '/settings':
        return 'System & Security Settings';
      default:
        return 'Enterprise Control';
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleQuickAddSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await employeeService.createEmployee(formData);
      showToast(
        `Employee ${formData.fullName} added successfully to the roster!`,
        'success'
      );
      setIsQuickAddOpen(false);
      // If currently on employees page, trigger page re-render via state or navigate
      if (location.pathname !== '/employees') {
        navigate('/employees');
      } else {
        window.dispatchEvent(new CustomEvent('employee_created'));
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to register employee.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-alabaster flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onQuickAdd={() => setIsQuickAddOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar
          title={getPageTitle()}
          onOpenSidebar={() => setSidebarOpen(true)}
          onQuickAdd={() => setIsQuickAddOpen(true)}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet
            context={{
              openQuickAdd: () => setIsQuickAddOpen(true),
              inspectEmployee: (emp) => setInspectedEmployee(emp),
            }}
          />
        </main>
      </div>

      {/* Global Quick Add Employee Modal */}
      <EmployeeFormModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSubmit={handleQuickAddSubmit}
        isLoading={isSubmitting}
      />

      {/* Global Inspect Employee Modal */}
      <EmployeeDetailModal
        isOpen={Boolean(inspectedEmployee)}
        onClose={() => setInspectedEmployee(null)}
        employee={inspectedEmployee}
        onEdit={(emp) => {
          setInspectedEmployee(null);
          navigate('/employees');
        }}
        onDelete={(emp) => {
          setInspectedEmployee(null);
          navigate('/employees');
        }}
      />

      {/* Toast notifications */}
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

export default AdminLayout;
