import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, ShieldCheck, UserPlus, Sparkles } from 'lucide-react';
import { getInitials } from '../../utils/formatters';

const Navbar = ({ onOpenSidebar, title = 'Overview', onQuickAdd }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 bg-alabaster/95 backdrop-blur-md border-b border-holly/10">
      {/* Left: Mobile hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-holly hover:bg-white border border-holly/10 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-holly tracking-tight">{title}</h2>
          <p className="text-[11px] font-medium text-holly/60 hidden sm:block">
            Enterprise Workforce & Directory Control
          </p>
        </div>
      </div>

      {/* Right: Actions & User pill */}
      <div className="flex items-center gap-3">
        {onQuickAdd && (
          <button
            onClick={onQuickAdd}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-soft-lime text-holly font-bold text-xs uppercase tracking-wider hover:bg-soft-lime-400 border border-soft-lime-400 shadow-sm transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Employee</span>
          </button>
        )}

        <div className="flex items-center gap-2.5 pl-3 border-l border-holly/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-holly leading-tight">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-holly/60 font-semibold tracking-wide">
              {user?.email || 'admin@enterprise.com'}
            </p>
          </div>

          <div
            className="w-9 h-9 rounded-xl bg-holly text-soft-lime flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-soft-lime/50"
            title={user?.email}
          >
            {getInitials(user?.name || 'Admin')}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
