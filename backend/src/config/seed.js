const User = require('../models/User');
const Employee = require('../models/Employee');

const seedData = async () => {
  try {
    // 1. Seed Default Admin if no admin exists
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      console.log('🌱 No admin user found. Creating initial administrator account...');
      await User.create({
        name: 'Aditya Sharma',
        email: 'admin@enterprise.com',
        password: 'Admin@123456',
        role: 'admin',
      });
      console.log('✅ Seeded default admin: admin@enterprise.com (Password: Admin@123456)');
    }

    // 2. Seed Employees if no employees exist
    const employeeCount = await Employee.countDocuments();
    if (employeeCount === 0) {
      console.log('🌱 No employee records found. Seeding initial enterprise workforce...');
      const sampleEmployees = [
        {
          employeeId: 'EMP-1001',
          fullName: 'Eleanor Vance',
          email: 'eleanor.vance@enterprise.com',
          phone: '+1 (555) 234-8901',
          department: 'Engineering',
          designation: 'Principal Staff Architect',
          salary: 165000,
          joiningDate: new Date('2021-03-15'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1002',
          fullName: 'Julian Hayes',
          email: 'julian.hayes@enterprise.com',
          phone: '+1 (555) 345-6712',
          department: 'Engineering',
          designation: 'Senior Full Stack Engineer',
          salary: 135000,
          joiningDate: new Date('2022-01-10'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1003',
          fullName: 'Sophia Chen',
          email: 'sophia.chen@enterprise.com',
          phone: '+1 (555) 456-7823',
          department: 'Product',
          designation: 'Lead Product Strategist',
          salary: 142000,
          joiningDate: new Date('2021-08-01'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1004',
          fullName: 'Marcus Sterling',
          email: 'marcus.sterling@enterprise.com',
          phone: '+1 (555) 567-8934',
          department: 'Design',
          designation: 'Design Systems Director',
          salary: 138000,
          joiningDate: new Date('2022-06-20'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1005',
          fullName: 'Amara Okafor',
          email: 'amara.okafor@enterprise.com',
          phone: '+1 (555) 678-9045',
          department: 'Human Resources',
          designation: 'Chief People Officer',
          salary: 155000,
          joiningDate: new Date('2020-11-12'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1006',
          fullName: 'David Lindqvist',
          email: 'david.lindqvist@enterprise.com',
          phone: '+1 (555) 789-0156',
          department: 'Finance',
          designation: 'Senior Financial Controller',
          salary: 128000,
          joiningDate: new Date('2023-02-14'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1007',
          fullName: 'Clara Moreau',
          email: 'clara.moreau@enterprise.com',
          phone: '+1 (555) 890-1267',
          department: 'Marketing',
          designation: 'Brand & Communications Lead',
          salary: 118000,
          joiningDate: new Date('2023-05-18'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1008',
          fullName: 'Nathaniel Drake',
          email: 'nathaniel.drake@enterprise.com',
          phone: '+1 (555) 901-2378',
          department: 'Engineering',
          designation: 'DevOps & SRE Specialist',
          salary: 125000,
          joiningDate: new Date('2023-09-01'),
          status: 'On Leave',
        },
        {
          employeeId: 'EMP-1009',
          fullName: 'Priya Sharma',
          email: 'priya.sharma@enterprise.com',
          phone: '+1 (555) 012-3489',
          department: 'Operations',
          designation: 'Operations Excellence Manager',
          salary: 110000,
          joiningDate: new Date('2024-01-15'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1010',
          fullName: 'Thomas Beaumont',
          email: 'thomas.beaumont@enterprise.com',
          phone: '+1 (555) 123-4590',
          department: 'Legal',
          designation: 'Senior Corporate Counsel',
          salary: 150000,
          joiningDate: new Date('2022-04-05'),
          status: 'Active',
        },
        {
          employeeId: 'EMP-1011',
          fullName: 'Vivian Zhao',
          email: 'vivian.zhao@enterprise.com',
          phone: '+1 (555) 234-5601',
          department: 'Engineering',
          designation: 'Associate Cloud Engineer',
          salary: 88000,
          joiningDate: new Date('2024-03-01'),
          status: 'Probation',
        },
        {
          employeeId: 'EMP-1012',
          fullName: 'Gabriel Santos',
          email: 'gabriel.santos@enterprise.com',
          phone: '+1 (555) 345-6718',
          department: 'Marketing',
          designation: 'Growth Marketing Strategist',
          salary: 95000,
          joiningDate: new Date('2023-10-10'),
          status: 'Inactive',
        },
      ];

      await Employee.insertMany(sampleEmployees);
      console.log(`✅ Seeded ${sampleEmployees.length} realistic employee records.`);
    }
  } catch (error) {
    console.error('⚠️ Seeding error:', error.message);
  }
};

module.exports = seedData;
