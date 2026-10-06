import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Lock, ShieldCheck, ArrowRight, Building2, Sparkles, KeyRound } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@enterprise.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Authentication failed. Please verify credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@enterprise.com');
    setPassword('Admin@123456');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-alabaster px-4 sm:px-6 py-12">
      {/* Brand & Auth Container */}
      <div className="w-full max-w-md space-y-6">
        {/* Brand identity */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-holly text-soft-lime shadow-card border border-holly-surface mb-2">
            <Building2 className="w-7 h-7 text-soft-lime" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-holly font-sans">
            CORP<span className="text-dusty-teal-600">PULSE</span>
          </h1>
          <p className="text-xs uppercase tracking-widest font-bold text-holly/60">
            Workforce Intelligence & Administration
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-7 sm:p-8 rounded-2xl border border-holly/10 shadow-card space-y-5">
          <div>
            <h2 className="text-lg font-bold text-holly tracking-tight">
              Administrator Sign In
            </h2>
            <p className="text-xs text-holly/60 mt-0.5">
              Enter your credentials to access protected employee records.
            </p>
          </div>

          {isExpired && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
              Your session has expired. Please sign in again.
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Corporate Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@enterprise.com"
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              icon={Lock}
              required
            />

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="pt-3 border-t border-holly/10">
            <div className="flex items-center justify-between p-3 rounded-xl bg-alabaster border border-holly/10 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-holly flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-dusty-teal-600" />
                  <span>Default Admin Account</span>
                </p>
                <p className="text-[11px] text-holly/70 font-mono">
                  admin@enterprise.com • Admin@123456
                </p>
              </div>
              <button
                type="button"
                onClick={handleUseDemo}
                className="px-2.5 py-1 rounded-lg bg-white border border-holly/15 text-[11px] font-bold text-holly hover:bg-soft-lime hover:border-soft-lime-500 transition-colors"
              >
                Auto-fill
              </button>
            </div>
          </div>
        </div>

        {/* Footer info & Register link */}
        <div className="text-center text-xs text-holly/60 space-y-2">
          <p>
            Need a secondary administrator account?{' '}
            <Link
              to="/register"
              className="font-bold text-holly hover:underline hover:text-holly-light"
            >
              Register here
            </Link>
          </p>
          <p className="text-[11px] text-holly/40">
            Protected by enterprise-grade JWT & bcrypt encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
