const { z } = require('zod');

const employeeSchema = z.object({
  employeeId: z
    .string()
    .trim()
    .min(2, 'Employee ID must be at least 2 characters')
    .max(20, 'Employee ID must not exceed 20 characters')
    .toUpperCase(),
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number must be at least 7 characters')
    .max(20, 'Phone number must not exceed 20 characters')
    .regex(/^[\d\s+\-()]+$/, 'Phone number contains invalid characters'),
  department: z
    .string()
    .trim()
    .min(2, 'Department must be selected or specified')
    .max(60, 'Department name is too long'),
  designation: z
    .string()
    .trim()
    .min(2, 'Designation must be at least 2 characters')
    .max(80, 'Designation is too long'),
  salary: z.coerce
    .number({ invalid_type_error: 'Salary must be a valid number' })
    .positive('Salary must be greater than zero'),
  joiningDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Joining date must be a valid date',
    }),
  status: z.enum(['Active', 'Inactive', 'On Leave', 'Probation'], {
    errorMap: () => ({ message: 'Status must be Active, Inactive, On Leave, or Probation' }),
  }),
});

const employeeUpdateSchema = employeeSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

module.exports = {
  employeeSchema,
  employeeUpdateSchema,
};
