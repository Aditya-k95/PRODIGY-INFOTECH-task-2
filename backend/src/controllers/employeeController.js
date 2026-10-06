const mongoose = require('mongoose');
const Employee = require('../models/Employee');

// @desc    Get all employees with search, filter, sort, and pagination
// @route   GET /api/employees
// @access  Private (Admin)
const getAllEmployees = async (req, res, next) => {
  try {
    const {
      search,
      q,
      department,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const queryFilter = {};

    // Search query for name, employeeId, email, or designation
    const searchTerm = (search || q || '').trim();
    if (searchTerm) {
      queryFilter.$or = [
        { fullName: { $regex: searchTerm, $options: 'i' } },
        { employeeId: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { designation: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department && department.toLowerCase() !== 'all') {
      queryFilter.department = { $regex: new RegExp(`^${department}$`, 'i') };
    }

    // Filter by status
    if (status && status.toLowerCase() !== 'all') {
      queryFilter.status = status;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const allowedSortFields = ['fullName', 'employeeId', 'salary', 'joiningDate', 'createdAt', 'department', 'status'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
    const sortOptions = { [sortField]: sortDirection };

    // Execute query and total count in parallel
    const [employees, total] = await Promise.all([
      Employee.find(queryFilter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Employee.countDocuments(queryFilter),
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        totalEmployees: total,
        currentPage: pageNum,
        totalPages,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private (Admin)
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let employee;
    if (mongoose.Types.ObjectId.isValid(id)) {
      employee = await Employee.findById(id);
    } else {
      employee = await Employee.findOne({ employeeId: id.toUpperCase() });
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private (Admin)
const createEmployee = async (req, res, next) => {
  try {
    const {
      employeeId,
      fullName,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status,
    } = req.body;

    // Check unique employeeId
    const existingId = await Employee.findOne({
      employeeId: employeeId.toUpperCase(),
    });
    if (existingId) {
      return res.status(400).json({
        success: false,
        message: `Employee ID '${employeeId.toUpperCase()}' is already in use.`,
      });
    }

    // Check unique email
    const existingEmail = await Employee.findOne({
      email: email.toLowerCase(),
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: `Email '${email.toLowerCase()}' is already registered to another employee.`,
      });
    }

    const employee = await Employee.create({
      employeeId: employeeId.toUpperCase(),
      fullName,
      email: email.toLowerCase(),
      phone,
      department,
      designation,
      salary,
      joiningDate: new Date(joiningDate),
      status: status || 'Active',
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee by ID
// @route   PUT /api/employees/:id
// @access  Private (Admin)
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee identifier format',
      });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    const {
      employeeId,
      fullName,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status,
    } = req.body;

    // If updating employeeId, verify uniqueness
    if (employeeId && employeeId.toUpperCase() !== employee.employeeId) {
      const existingId = await Employee.findOne({
        employeeId: employeeId.toUpperCase(),
        _id: { $ne: id },
      });
      if (existingId) {
        return res.status(400).json({
          success: false,
          message: `Employee ID '${employeeId.toUpperCase()}' is already in use.`,
        });
      }
      employee.employeeId = employeeId.toUpperCase();
    }

    // If updating email, verify uniqueness
    if (email && email.toLowerCase() !== employee.email) {
      const existingEmail = await Employee.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: `Email '${email.toLowerCase()}' is already in use.`,
        });
      }
      employee.email = email.toLowerCase();
    }

    if (fullName) employee.fullName = fullName;
    if (phone) employee.phone = phone;
    if (department) employee.department = department;
    if (designation) employee.designation = designation;
    if (salary !== undefined) employee.salary = Number(salary);
    if (joiningDate) employee.joiningDate = new Date(joiningDate);
    if (status) employee.status = status;

    await employee.save();

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee by ID
// @route   DELETE /api/employees/:id
// @access  Private (Admin)
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee identifier format',
      });
    }

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: {
        id: employee._id,
        employeeId: employee.employeeId,
        fullName: employee.fullName,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
