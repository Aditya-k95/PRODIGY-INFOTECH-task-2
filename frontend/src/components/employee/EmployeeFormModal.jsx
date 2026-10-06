import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { DEPARTMENTS, EMPLOYMENT_STATUSES } from '../../utils/constants';
import { formatDateInput } from '../../utils/formatters';
import {
  IdCard,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Calendar,
  Layers,
  Save,
} from 'lucide-react';

const EmployeeFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  employee = null, // null for Create, populated object for Edit
  isLoading = false,
}) => {
  const isEditMode = Boolean(employee);

  const initialFormState = {
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Engineering',
    designation: '',
    salary: '',
    joiningDate: formatDateInput(new Date()),
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee && isEditMode) {
      setFormData({
        employeeId: employee.employeeId || '',
        fullName: employee.fullName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || 'Engineering',
        designation: employee.designation || '',
        salary: employee.salary !== undefined ? String(employee.salary) : '',
        joiningDate: formatDateInput(employee.joiningDate),
        status: employee.status || 'Active',
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [employee, isEditMode, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'employeeId' ? value.toUpperCase() : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (formData.employeeId.trim().length < 2) {
      newErrors.employeeId = 'Employee ID must be at least 2 characters';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Phone number must be at least 7 characters';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation / Job title is required';
    }

    if (formData.salary === '' || formData.salary === null) {
      newErrors.salary = 'Annual salary is required';
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      salary: Number(formData.salary),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Employee Record' : 'Register New Employee'}
      subtitle={
        isEditMode
          ? `Updating records for ${employee?.employeeId || 'selected employee'}`
          : 'Complete the official employment fields to add an employee.'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Employee ID & Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="e.g. EMP-1015"
            icon={IdCard}
            error={errors.employeeId}
            required
            helperText="Uppercase corporate badge ID"
          />

          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Sarah Jenkins"
            icon={User}
            error={errors.fullName}
            required
          />
        </div>

        {/* Row 2: Corporate Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Corporate Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="s.jenkins@enterprise.com"
            icon={Mail}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            icon={Phone}
            error={errors.phone}
            required
          />
        </div>

        {/* Row 3: Department & Designation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-holly/80 mb-1.5">
              Department <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-holly/40">
                <Layers className="w-4 h-4" />
              </div>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-holly text-sm rounded-xl border border-holly/15 focus:outline-none focus:ring-2 focus:ring-holly focus:border-transparent cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Designation / Role"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g. Senior Systems Analyst"
            icon={Briefcase}
            error={errors.designation}
            required
          />
        </div>

        {/* Row 4: Salary & Joining Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Annual Compensation (USD)"
            name="salary"
            type="number"
            min="1"
            step="1000"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 125000"
            icon={DollarSign}
            error={errors.salary}
            required
          />

          <Input
            label="Joining Date"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleChange}
            icon={Calendar}
            error={errors.joiningDate}
            required
          />
        </div>

        {/* Row 5: Employment Status */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-holly/80 mb-1.5">
            Employment Status <span className="text-rose-600">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {EMPLOYMENT_STATUSES.map((st) => (
              <label
                key={st}
                className={`
                  flex items-center justify-center px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all
                  ${
                    formData.status === st
                      ? 'bg-soft-lime text-holly border-soft-lime-500 font-bold shadow-sm'
                      : 'bg-white text-holly/80 border-holly/15 hover:bg-alabaster'
                  }
                `}
              >
                <input
                  type="radio"
                  name="status"
                  value={st}
                  checked={formData.status === st}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>{st}</span>
              </label>
            ))}
          </div>
          {errors.status && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.status}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-holly/10">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="cta"
            icon={Save}
            isLoading={isLoading}
          >
            {isEditMode ? 'Save Changes' : 'Confirm & Add Employee'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeFormModal;
