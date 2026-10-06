import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  LogOut,
  Building2,
  X,
  ShieldCheck,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onQuickAdd }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      to: '/',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Employees',
      to: '/employees',
      icon: Users,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-holly/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-holly text-alabaster
          border-r border-holly-surface shadow-elevated flex flex-col justify-between
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-soft-lime flex items-center justify-center text-holly font-black shadow-glow-lime/50">
                <Building2 className="w-5 h-5 text-holly" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white leading-tight font-sans">
                  CORP<span className="text-soft-lime">PULSE</span>
                </h1>
                <p className="text-[10px] tracking-widest text-dusty-teal uppercase font-semibold">
                  Enterprise EMS
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-alabaster/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action button inside sidebar */}
          <div className="px-4 pt-5 pb-2">
            <button
              onClick={() => {
                if (onClose) onClose();
                if (onQuickAdd) onQuickAdd();
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-soft-lime text-holly font-bold text-xs uppercase tracking-wider hover:bg-soft-lime-400 shadow-glow-lime/40 transition-all active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Employee</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1.5">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-alabaster/40">
              Workspace
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? 'bg-soft-lime text-holly shadow-sm font-bold'
                        : 'text-alabaster/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-holly' : 'text-dusty-teal'
                        }`}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-4">
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-alabaster/40">
                System
              </p>
              <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${
                    isActive
                      ? 'bg-soft-lime text-holly shadow-sm font-bold'
                      : 'text-alabaster/80 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Settings
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-holly' : 'text-dusty-teal'
                      }`}
                    />
                    <span>Settings & Security</span>
                  </>
                )}
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-holly-surface/60">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-dusty-teal/20 text-dusty-teal border border-dusty-teal/40 flex items-center justify-center font-bold text-xs shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-soft-lime font-medium uppercase tracking-wider truncate">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/30 border border-rose-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
