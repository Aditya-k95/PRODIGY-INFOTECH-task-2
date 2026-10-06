import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  employee,
  isLoading = false,
}) => {
  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Employee Deletion"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
          <div className="p-2.5 rounded-lg bg-rose-100 text-rose-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-rose-950">
              Irreversible HR Action
            </p>
            <p className="text-xs text-rose-800/90 mt-0.5">
              Deleting this record will permanently remove the employee profile and payroll association.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-holly/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-holly/60 uppercase font-semibold">Employee ID:</span>
            <span className="font-mono font-bold text-holly bg-alabaster px-2 py-0.5 rounded border border-holly/10">
              {employee.employeeId}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-holly/60 uppercase font-semibold">Full Name:</span>
            <span className="font-semibold text-holly">{employee.fullName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-holly/60 uppercase font-semibold">Department:</span>
            <span className="text-holly">{employee.department}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-holly/60 uppercase font-semibold">Designation:</span>
            <span className="text-holly">{employee.designation}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-holly/10">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            icon={Trash2}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            Delete Employee Record
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
