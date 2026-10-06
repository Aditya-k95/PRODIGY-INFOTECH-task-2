const Employee = require('../models/Employee');

// @desc    Get dashboard metrics & statistical aggregations
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getStats = async (req, res, next) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      onLeaveEmployees,
      probationEmployees,
      departmentsList,
      recentEmployees,
      departmentStats,
      salaryStats,
    ] = await Promise.all([
      // Total count
      Employee.countDocuments(),
      // Active count
      Employee.countDocuments({ status: 'Active' }),
      // Inactive count
      Employee.countDocuments({ status: 'Inactive' }),
      // On Leave count
      Employee.countDocuments({ status: 'On Leave' }),
      // Probation count
      Employee.countDocuments({ status: 'Probation' }),
      // Distinct departments
      Employee.distinct('department'),
      // Top 5 recently added
      Employee.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      // Employees count by department
      Employee.aggregate([
        {
          $group: {
            _id: '$department',
            count: { $sum: 1 },
            avgSalary: { $avg: '$salary' },
          },
        },
        { $sort: { count: -1 } },
      ]),
      // Overall salary aggregations
      Employee.aggregate([
        {
          $group: {
            _id: null,
            totalPayroll: { $sum: '$salary' },
            avgSalary: { $avg: '$salary' },
            minSalary: { $min: '$salary' },
            maxSalary: { $max: '$salary' },
          },
        },
      ]),
    ]);

    const payroll = salaryStats[0] || {
      totalPayroll: 0,
      avgSalary: 0,
      minSalary: 0,
      maxSalary: 0,
    };

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        onLeaveEmployees,
        probationEmployees,
        totalDepartments: departmentsList.length,
        departments: departmentsList,
        recentlyAddedEmployees: recentEmployees,
        departmentDistribution: departmentStats.map((d) => ({
          department: d._id,
          count: d.count,
          avgSalary: Math.round(d.avgSalary || 0),
        })),
        payrollSummary: {
          totalMonthlyPayroll: Math.round(payroll.totalPayroll || 0),
          averageSalary: Math.round(payroll.avgSalary || 0),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
