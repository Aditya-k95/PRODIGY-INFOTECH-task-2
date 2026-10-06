import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Compass, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-alabaster text-center">
      <div className="w-16 h-16 rounded-2xl bg-holly text-soft-lime flex items-center justify-center mb-4 shadow-card">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-holly tracking-tight">
        404 — Page Not Found
      </h1>
      <p className="mt-2 text-sm text-holly/60 max-w-sm">
        The system path or resource you requested does not exist or has been relocated.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="cta" icon={Home}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
