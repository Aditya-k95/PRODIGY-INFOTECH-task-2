import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('All fields are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-alabaster px-4 sm:px-6 py-12">
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

        {/* Register Card */}
        <div className="bg-white p-7 sm:p-8 rounded-2xl border border-holly/10 shadow-card space-y-5">
          <div>
            <h2 className="text-lg font-bold text-holly tracking-tight">
              Create Administrator Account
            </h2>
            <p className="text-xs text-holly/60 mt-0.5">
              Provision an authorized credentials set to administer employee records.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jordan Miller"
              icon={User}
              required
            />

            <Input
              label="Corporate Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jordan.miller@enterprise.com"
              icon={Mail}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              icon={Lock}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              icon={ShieldCheck}
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
              Register & Enter Dashboard
            </Button>
          </form>
        </div>

        <div className="text-center text-xs text-holly/60">
          Already registered?{' '}
          <Link
            to="/login"
            className="font-bold text-holly hover:underline hover:text-holly-light"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
