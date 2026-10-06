import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  formatCurrency,
  formatDate,
  calculateTenure,
  getInitials,
  getAvatarColor,
} from '../../utils/formatters';
import {
  Mail,
  Phone,
  Briefcase,
  Layers,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  DollarSign,
  IdCard,
} from 'lucide-react';

const EmployeeDetailModal = ({
  isOpen,
  onClose,
  employee,
  onEdit,
  onDelete,
}) => {
  if (!employee) return null;

  const avatar = getAvatarColor(employee.fullName);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employee Personnel Record"
      subtitle="Confidential HR Profile"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-holly/10">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl border shadow-subtle shrink-0"
              style={{
                backgroundColor: avatar.bg,
                color: avatar.text,
                borderColor: avatar.border,
              }}
            >
              {getInitials(employee.fullName)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-holly tracking-tight">
                  {employee.fullName}
                </h3>
                <Badge status={employee.status} />
              </div>
              <p className="text-sm font-semibold text-holly/70 mt-0.5">
                {employee.designation} • <span className="text-dusty-teal-600 font-bold">{employee.department}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono font-bold text-holly/80 bg-alabaster px-2 py-0.5 rounded border border-holly/10">
                  {employee.employeeId}
                </span>
                <span className="text-xs text-holly/50">
                  Tenure: {calculateTenure(employee.joiningDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Contact Information */}
          <div className="p-4 rounded-xl bg-white border border-holly/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-holly/50">
              Contact Channels
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-holly">
                <Mail className="w-4 h-4 text-dusty-teal-600 shrink-0" />
                <a
                  href={`mailto:${employee.email}`}
                  className="font-medium hover:underline text-holly"
                >
                  {employee.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-holly">
                <Phone className="w-4 h-4 text-dusty-teal-600 shrink-0" />
                <a
                  href={`tel:${employee.phone}`}
                  className="font-medium hover:underline text-holly"
                >
                  {employee.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Compensation & Department */}
          <div className="p-4 rounded-xl bg-white border border-holly/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-holly/50">
              Compensation & Unit
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-holly/60">Annual Salary:</span>
                <span className="font-bold text-sm text-holly bg-soft-lime/30 px-2 py-0.5 rounded border border-soft-lime/60">
                  {formatCurrency(employee.salary)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-holly/60">Department:</span>
                <span className="font-semibold text-holly">{employee.department}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Timeline & Dates */}
          <div className="p-4 rounded-xl bg-white border border-holly/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-holly/50">
              Employment Timeline
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-holly/60">Date of Joining:</span>
                <span className="font-semibold text-holly">
                  {formatDate(employee.joiningDate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-holly/60">Record Created:</span>
                <span className="text-holly">
                  {formatDate(employee.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Audit & System Integrity */}
          <div className="p-4 rounded-xl bg-white border border-holly/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-holly/50">
              Audit & Verification
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-holly/60">Last Updated:</span>
                <span className="text-holly">
                  {formatDate(employee.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-holly/60">System ID:</span>
                <span className="font-mono text-[10px] text-holly/50 truncate max-w-[140px]">
                  {employee._id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-holly/10">
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => {
              onClose();
              onDelete(employee);
            }}
          >
            Delete Record
          </Button>

          <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Edit3}
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
            >
              Edit Details
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeDetailModal;
