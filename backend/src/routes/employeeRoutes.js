const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  employeeSchema,
  employeeUpdateSchema,
} = require('../validators/employeeValidator');

// All employee routes are protected by admin auth middleware
router.use(protect);

router.route('/')
  .get(getAllEmployees)
  .post(validate(employeeSchema), createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(validate(employeeUpdateSchema), updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
