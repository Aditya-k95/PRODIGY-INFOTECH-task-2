import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { dashboardService } from '../services/dashboardService';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import {
  formatCurrency,
  formatDate,
  getInitials,
  getAvatarColor,
} from '../utils/formatters';
import {
  Users,
  UserCheck,
  UserX,
  Building,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Layers,
  Sparkles,
  DollarSign,
  Eye,
  RefreshCw,
} from 'lucide-react';

const Dashboard = () => {
  const { openQuickAdd, inspectEmployee } = useOutletContext() || {};
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getStats();
      setStats(res.data);
    } catch (err) {
      setError('Failed to load dashboard metrics from backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-holly/10 shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-soft-lime text-holly font-bold text-[10px] uppercase tracking-wider border border-soft-lime-500">
              Live Workforce Intelligence
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-holly tracking-tight">
            Workforce Executive Overview
          </h2>
          <p className="text-xs text-holly/60">
            Real-time directory analytics, headcount distribution, and active personnel records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={fetchStats}
            title="Refresh statistics"
          >
            Refresh
          </Button>

          <Button
            variant="cta"
            size="sm"
            icon={UserPlus}
            onClick={openQuickAdd}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={fetchStats}>
            Retry
          </Button>
        </div>
      )}

      {/* KPI Cards: Mixture of Deep Green, Soft Lime, Dusty Teal, and Alabaster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {/* Deep Green Card: Authority & Total Headcount */}
            <StatCard
              title="Total Workforce"
              value={stats?.totalEmployees || 0}
              subtitle="Registered enterprise employees"
              icon={Users}
              variant="holly"
            />

            {/* Soft Lime Card: Active Personnel Highlight */}
            <StatCard
              title="Active Headcount"
              value={stats?.activeEmployees || 0}
              subtitle={`${
                stats?.totalEmployees
                  ? Math.round((stats.activeEmployees / stats.totalEmployees) * 100)
                  : 0
              }% engagement rate`}
              icon={UserCheck}
              variant="lime"
              trend="Operational"
            />

            {/* Dusty Teal Card: Departments */}
            <StatCard
              title="Departments"
              value={stats?.totalDepartments || 0}
              subtitle="Distinct operational divisions"
              icon={Building}
              variant="teal"
            />

            {/* Alabaster Card: Inactive / On Leave */}
            <StatCard
              title="Inactive & On Leave"
              value={(stats?.inactiveEmployees || 0) + (stats?.onLeaveEmployees || 0)}
              subtitle={`${stats?.inactiveEmployees || 0} inactive • ${stats?.onLeaveEmployees || 0} on leave`}
              icon={UserX}
              variant="alabaster"
            />
          </>
        )}
      </div>

      {/* Secondary Row: Department Distribution & Payroll Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Department Distribution */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-holly/10 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-holly uppercase tracking-wider">
                Workforce by Department
              </h3>
              <p className="text-xs text-holly/60">
                Staff distribution across corporate divisions
              </p>
            </div>
            <span className="text-xs font-semibold text-dusty-teal-600 bg-dusty-teal/20 px-2.5 py-1 rounded-lg">
              {stats?.departments?.length || 0} Units
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {stats?.departmentDistribution?.map((item) => {
              const total = stats.totalEmployees || 1;
              const percentage = Math.round((item.count / total) * 100);

              return (
                <div key={item.department} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-holly">
                      {item.department}
                    </span>
                    <span className="text-holly/70 font-medium">
                      <span className="font-bold text-holly">{item.count}</span>{' '}
                      members ({percentage}%) • Avg {formatCurrency(item.avgSalary)}
                    </span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-2 rounded-full bg-alabaster-300 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-holly transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {(!stats?.departmentDistribution || stats.departmentDistribution.length === 0) && (
              <p className="text-xs text-holly/50 py-4 text-center">
                No departmental metrics recorded.
              </p>
            )}
          </div>
        </div>

        {/* Right 1 Col: Financial & Quick Directory Action */}
        <div className="space-y-6">
          {/* Payroll Highlights */}
          <div className="p-6 rounded-2xl bg-holly text-alabaster shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-soft-lime">
                Compensation Intelligence
              </span>
              <DollarSign className="w-4 h-4 text-soft-lime" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-alabaster/70">Estimated Monthly Payroll</p>
              <h4 className="text-2xl font-extrabold text-white">
                {formatCurrency(
                  stats?.payrollSummary?.totalMonthlyPayroll
                    ? Math.round(stats.payrollSummary.totalMonthlyPayroll / 12)
                    : 0
                )}
              </h4>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-alabaster/70">Average Annual Salary:</span>
              <span className="font-bold text-soft-lime">
                {formatCurrency(stats?.payrollSummary?.averageSalary || 0)}
              </span>
            </div>
          </div>

          {/* Quick Access Card */}
          <div className="p-6 rounded-2xl bg-dusty-teal/20 border border-dusty-teal/40 space-y-3">
            <h4 className="text-sm font-bold text-holly">
              Employee Directory Hub
            </h4>
            <p className="text-xs text-holly/70 leading-relaxed">
              Quickly perform batch filtering, inspect individual records, or update job status.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              className="w-full"
              onClick={() => navigate('/employees')}
            >
              Open Full Directory
            </Button>
          </div>
        </div>
      </div>

      {/* Recently Added Employees Section */}
      <div className="p-6 rounded-2xl bg-white border border-holly/10 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-holly uppercase tracking-wider">
              Recently Added Employees
            </h3>
            <p className="text-xs text-holly/60">
              Latest additions to the enterprise personnel database
            </p>
          </div>

          <button
            onClick={() => navigate('/employees')}
            className="text-xs font-bold text-holly hover:text-dusty-teal-600 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-holly/10 text-holly/60 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Badge ID</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-holly/5">
              {stats?.recentlyAddedEmployees?.map((emp) => {
                const avatar = getAvatarColor(emp.fullName);
                return (
                  <tr key={emp._id} className="hover:bg-alabaster/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 border"
                          style={{
                            backgroundColor: avatar.bg,
                            color: avatar.text,
                            borderColor: avatar.border,
                          }}
                        >
                          {getInitials(emp.fullName)}
                        </div>
                        <div>
                          <p className="font-bold text-holly">{emp.fullName}</p>
                          <p className="text-[10px] text-holly/50">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-xs font-semibold text-holly bg-alabaster px-2 py-0.5 rounded border border-holly/10">
                        {emp.employeeId}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-holly">
                      {emp.designation}
                    </td>
                    <td className="py-3 px-3 text-dusty-teal-600 font-semibold">
                      {emp.department}
                    </td>
                    <td className="py-3 px-3">
                      <Badge status={emp.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => inspectEmployee && inspectEmployee(emp)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-holly/70 hover:text-holly hover:bg-alabaster transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="font-medium text-[11px]">Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
