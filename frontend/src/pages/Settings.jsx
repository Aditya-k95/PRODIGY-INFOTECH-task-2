import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Key, Database, Server, Lock, UserCheck } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-holly tracking-tight">
          System Administration & Security
        </h2>
        <p className="text-xs text-holly/60 mt-0.5">
          Enterprise access controls, encryption configurations, and database connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <div className="p-6 rounded-2xl bg-white border border-holly/10 shadow-subtle space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-soft-lime text-holly">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-holly">Admin Profile</h3>
              <p className="text-xs text-holly/60">Current authenticated session</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Administrator Name:</span>
              <span className="font-bold text-holly">{user?.name || 'Aditya Sharma'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Email:</span>
              <span className="font-semibold text-holly">{user?.email || 'admin@enterprise.com'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Role Level:</span>
              <span className="font-bold text-holly uppercase bg-soft-lime/40 px-2 py-0.5 rounded border border-soft-lime/60">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
        </div>

        {/* Security & Cryptography Card */}
        <div className="p-6 rounded-2xl bg-white border border-holly/10 shadow-subtle space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-dusty-teal/30 text-holly">
              <Lock className="w-5 h-5 text-dusty-teal-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-holly">Security Architecture</h3>
              <p className="text-xs text-holly/60">Active cryptographic protections</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Password Hashing:</span>
              <span className="font-mono font-semibold text-holly">bcrypt (10 salt rounds)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Token Authentication:</span>
              <span className="font-mono font-semibold text-holly">JWT (HMAC SHA-256)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-alabaster">
              <span className="text-holly/60">Token Lifetime:</span>
              <span className="font-semibold text-holly">7 Days (Auto-refresh on verify)</span>
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Card */}
        <div className="p-6 rounded-2xl bg-white border border-holly/10 shadow-subtle space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-holly text-soft-lime">
              <Database className="w-5 h-5 text-soft-lime" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-holly">Database Engine & Storage</h3>
              <p className="text-xs text-holly/60">Mongoose ODM & MongoDB persistence layer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-alabaster space-y-1">
              <p className="text-holly/60">Collection Model</p>
              <p className="font-bold text-holly">Users & Employees</p>
            </div>
            <div className="p-3 rounded-xl bg-alabaster space-y-1">
              <p className="text-holly/60">Unique Indexes</p>
              <p className="font-bold text-holly">employeeId, email</p>
            </div>
            <div className="p-3 rounded-xl bg-alabaster space-y-1">
              <p className="text-holly/60">Validation Engine</p>
              <p className="font-bold text-holly">Zod + Mongoose Schemas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
